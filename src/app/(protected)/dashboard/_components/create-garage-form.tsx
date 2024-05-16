"use client";

import createGarage from "@/api/garages/create";
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
import { User, insertGarageSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { userId: User["id"]; onSuccess: () => void };

const formSchema = insertGarageSchema.pick({ name: true });

export default function CreateGarageForm({ userId, onSuccess }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });
  const [state, formAction] = useFormState(createGarage.bind(null, userId), {
    errors: [],
    success: false,
  });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    form.handleSubmit(() => formAction(formData))(event);
  }

  useEffect(() => {
    if (state.success) onSuccess();
  }, [state.success, onSuccess]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={submitForm}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label htmlFor="name">Garage name</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
        {state?.errors.map((error, index) => (
          <p key={`new-garage-form__error--${index}`}>{error}</p>
        ))}
      </form>
    </Form>
  );
}
