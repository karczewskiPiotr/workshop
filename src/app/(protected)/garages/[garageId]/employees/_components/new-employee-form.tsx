"use client";

import createEmployee from "@/api/employees/create-employee";
import getPotentialEmployees from "@/api/employees/get-potential-employess";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Garage, insertEmployeeSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  garageId: Garage["id"];
  employeesPool: Awaited<ReturnType<typeof getPotentialEmployees>>;
  closeDialog: () => void;
};

const formSchema = insertEmployeeSchema.pick({ userId: true });

export default function NewEmployeeForm({
  garageId,
  employeesPool,
  closeDialog,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [state, formAction] = useFormState(
    createEmployee.bind(null, garageId),
    { errors: [], success: false }
  );

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit((data) => {
      const formData = new FormData(formRef.current!);
      formData.set("userId", data.userId);
      formAction(formData);
    })(event);
  }

  useEffect(() => {
    if (state.success === true) closeDialog();
  }, [state.success]);

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
          render={({ field }) => {
            const employee = employeesPool.find((e) => e.id === field.value);

            return (
              <FormItem className="flex flex-col">
                <FormLabel>User</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? employee?.name + " " + employee?.surname
                          : "Select user"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search user..."
                        className="h-9"
                      />
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {employeesPool.map((employee) => (
                            <CommandItem
                              keywords={[
                                employee.email,
                                employee.name,
                                employee.surname,
                              ]}
                              key={employee.id}
                              value={employee.id}
                              onSelect={() =>
                                form.setValue("userId", employee.id)
                              }
                              className="flex justify-between"
                            >
                              <EmployeeItem employee={employee} />
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  employee.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  You can search for the user by their name, surname or email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Send employment proposal</Button>
        {state?.errors.map((error, index) => (
          <p key={`new-employee-form__error--${index}`}>{error}</p>
        ))}
      </form>
    </Form>
  );
}

function EmployeeItem({
  employee,
}: {
  employee: Awaited<ReturnType<typeof getPotentialEmployees>>[number];
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-medium">
        {employee.name} {employee.surname}
      </div>
      <div className="text-xs text-muted-foreground">{employee.email}</div>
    </div>
  );
}
