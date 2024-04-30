"use client";

import createCar from "@/api/cars/create-car";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Client, insertCarSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = insertCarSchema.pick({
  clientId: true,
  make: true,
  model: true,
  licensePlate: true,
  vinNumber: true,
  fleet: true,
});

type Props = { clients: Client[]; closeDialog: () => void };

export default function NewCarForm({ clients, closeDialog }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      licensePlate: "",
      vinNumber: "",
      fleet: false,
    },
  });

  const [state, formAction] = useFormState(createCar, {
    errors: [],
    success: false,
  });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit((data) => {
      const formData = new FormData(formRef.current!);
      formData.append("clientId", data.clientId);
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
          name="clientId"
          render={({ field }) => {
            const client = clients.find((client) => client.id === field.value);

            return (
              <FormItem className="flex flex-col">
                <FormLabel asChild>
                  <Label>Owner</Label>
                </FormLabel>
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
                          ? client?.name + " " + client?.surname
                          : "Select user"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search client..."
                        className="h-9"
                      />
                      <CommandEmpty>No clients found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {clients.map((client) => (
                            <CommandItem
                              keywords={
                                [
                                  client.name,
                                  client.surname,
                                  client.email,
                                  client.phone,
                                  client.company,
                                ].filter(Boolean) as string[]
                              }
                              key={client.id}
                              value={client.id}
                              onSelect={() =>
                                form.setValue("clientId", client.id)
                              }
                              className="flex justify-between"
                            >
                              <ClientItem client={client} />
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  client.id === field.value
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
                  You can search for the client by their name, surname, email,
                  phone number or company name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Make *</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Model *</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>License plate</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vinNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>VIN number</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fleet"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormLabel asChild>
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Part of company fleet?
                </Label>
              </FormLabel>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={value}
                  onCheckedChange={onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add a car</Button>
        {state?.errors.map((error, index) => (
          <p key={`new-car-form__error--${index}`}>{error}</p>
        ))}
      </form>
    </Form>
  );
}

function ClientItem({ client }: { client: Client }) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-medium">
        {client.name} {client.surname}
      </div>
      <div className="text-xs text-muted-foreground">{client.email}</div>
    </div>
  );
}
