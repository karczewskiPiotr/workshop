"use client";

import resendEmailVerificationCode from "@/api/auth/resend-email-verification-code";
import verifyEmail from "@/api/auth/verify-email";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insertEmailVerificationCodeSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

const formSchema = insertEmailVerificationCodeSchema.pick({ code: true });

export default function EmailVerificationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });
  const [state, formAction] = useFormState(verifyEmail, { errors: [] });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit(() => formAction(new FormData(formRef.current!)))(event);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={submit}
        className="grid gap-4"
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel asChild>
                <Label>Code</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormDescription>
                Enter the code that was sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.errors.map((error, index) => (
          <p key={`login-form__error--${index}`} className="text-destructive">
            {error}
          </p>
        ))}
        <Button type="submit">Verify email</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => resendEmailVerificationCode()}
        >
          Resend code
        </Button>
      </form>
    </Form>
  );
}
