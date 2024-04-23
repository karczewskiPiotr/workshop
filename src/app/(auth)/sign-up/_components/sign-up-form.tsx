"use client";

import signup from "@/api/auth/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { insertUserSchema } from "@/db/schema";
import { FormEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

const formSchema = insertUserSchema.pick({
  name: true,
  surname: true,
  email: true,
  password: true,
});

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(signup, { errors: [] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel asChild>
                    <Label>Name</Label>
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
              name="surname"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel asChild>
                    <Label>Surname</Label>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <FormLabel asChild>
                  <Label>Password</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={cn(state.errors.length === 0 && "hidden")}>
            {state?.errors.map((error, index) => (
              <p key={`signUpFormError-${index}`} className="text-destructive">
                {error}
              </p>
            ))}
          </div>

          <Button type="submit">Create an account</Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </div>
    </>
  );
}
