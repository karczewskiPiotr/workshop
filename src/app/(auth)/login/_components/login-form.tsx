"use client";

import login from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insertUserSchema, selectUserSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = insertUserSchema.pick({
  email: true,
  password: true,
});

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(login, { errors: [] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit(() => formAction(new FormData(formRef.current!)))(event);
  }

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={submitForm}
          className="grid gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel asChild>
                  <Label>Email</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel asChild>
                    <Label>Password</Label>
                  </FormLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline pointer-events-none"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={cn(state.errors.length === 0 && "hidden")}>
            {state?.errors.map((error, index) => (
              <p key={`loginFormError-${index}`} className="text-destructive">
                {error}
              </p>
            ))}
          </div>

          <Button type="submit">Log in</Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
