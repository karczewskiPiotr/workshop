"use client";

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
import { insertClientSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, PropsWithChildren, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type InferedFormSchema = z.infer<typeof formSchema>;
type FormSchema = {
  [Property in keyof InferedFormSchema]: NonNullable<
    InferedFormSchema[Property]
  >;
};

const formSchema = insertClientSchema.pick({
  name: true,
  surname: true,
  company: true,
  email: true,
  phone: true,
});

type Props = PropsWithChildren<{
  action: (
    formState: any,
    formData: FormData
  ) => Promise<{ success: boolean; errors: string[] }>;
  defaultValues?: Partial<InferedFormSchema>;
  onSuccess?: () => void;
}>;

export default function ClientForm({
  children,
  defaultValues,
  action,
  onSuccess,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      surname: defaultValues?.surname ?? "",
      company: defaultValues?.company ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
    },
  });

  const [state, formAction] = useFormState(action, {
    success: false,
    errors: [],
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit(() => {
      const formData = new FormData(formRef.current!);
      formAction(formData);
    })(event);
  }

  useEffect(() => {
    if (state.success && onSuccess) onSuccess();
  }, [state.success, onSuccess]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={submit}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Company</Label>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Email</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Phone</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
        {state?.errors.map((error, index) => (
          <p key={`client-form__error-${index}`}>{error}</p>
        ))}
      </form>
    </Form>
  );
}
