"use client";

import getGarageCars from "@/api/cars/get-garage-cars";
import createRepair from "@/api/repairs/create-repair";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Garage, User, insertRepairSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { format, formatISO } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Props = {
  garageId: Garage["id"];
  userId: User["id"];
  cars: Awaited<ReturnType<typeof getGarageCars>>;
  closeDialog: () => void;
};

const formSchema = insertRepairSchema.pick({
  carId: true,
  description: true,
  servicedAt: true,
});

export default function RepairForm(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servicedAt: new Date(),
    },
  });

  const [state, formAction] = useFormState(
    createRepair.bind(null, props.garageId, props.userId),
    { errors: [], success: false }
  );

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit((data) => {
      const formData = new FormData(formRef.current!);
      formData.set("servicedAt", formatISO(data.servicedAt!));
      formData.set("carId", data.carId);
      formAction(formData);
    })(event);
  }

  useEffect(() => {
    if (state.success) props.closeDialog();
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
          name="carId"
          render={({ field }) => {
            const car = props.cars.find((car) => car.id === field.value);

            return (
              <FormItem className="flex flex-col">
                <FormLabel asChild>
                  <Label>Car</Label>
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
                          ? car?.make + " " + car?.model
                          : "Select car"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search car..."
                        className="h-9"
                      />
                      <CommandEmpty>No cars found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {props.cars.map((car) => (
                            <CommandItem
                              keywords={
                                [
                                  car.make,
                                  car.model,
                                  car.vinNumber,
                                  car.licensePlate,
                                  car.clientName,
                                  car.clientSurname,
                                  car.clientCompany,
                                ].filter(Boolean) as string[]
                              }
                              key={car.id}
                              value={car.id}
                              onSelect={() => form.setValue("carId", car.id)}
                              className="flex justify-between"
                            >
                              <CarItem car={car} />
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  car.id === field.value
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
                  You can search for the car by its make, model, vin number,
                  license plate, client name, surname or company name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Description</Label>
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Describe repairs/maintenance done to the car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servicedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel asChild>
                <Label>Date of repair</Label>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Choose a date if you are backlogging a repair.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add a repair</Button>
        {state?.errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </form>
    </Form>
  );
}

function CarItem({ car }: { car: Props["cars"][number] }) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-medium">
        {car.make} {car.model}
      </div>
      <div className="text-xs text-muted-foreground">
        {car.clientName} {car.clientSurname}
      </div>
    </div>
  );
}
