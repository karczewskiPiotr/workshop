"use client";

import createEmployee from "@/api/employees/create-employee";
import getPotentialEmployees from "@/api/employees/get-potential-employess";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Garage, insertEmployeeSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  garageId: Garage["id"];
  employeesPool: Awaited<ReturnType<typeof getPotentialEmployees>>;
};

const formSchema = insertEmployeeSchema.pick({ userId: true });

export default function NewEmployeeForm({ garageId, employeesPool }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [state, formAction] = useFormState(
    createEmployee.bind(null, garageId),
    { errors: [] }
  );

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit(() => {
      const formData = new FormData(formRef.current!);
      formAction(formData);
    })(event);
  }

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
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label htmlFor="userId">User</Label>
              </FormLabel>
              <Select name={field.name} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user to employ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employeesPool.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} {employee.surname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can search for the user by name, surname and email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send employment proposal</Button>
        {state?.errors.map((error, index) => (
          <p key={`new-employee-form__error--${index}`}>{error}</p>
        ))}
      </form>
    </Form>
  );
}
