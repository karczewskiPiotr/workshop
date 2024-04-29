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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Garage, User, insertRepairSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { format, formatISO, toDate } from "date-fns";
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
import { CalendarIcon } from "lucide-react";
import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import updateRepair from "@/api/repairs/update-repair";

type GarageRepair = Awaited<ReturnType<typeof getGarageRepairs>>[number];

type Props = {
  repair: GarageRepair["repair"];
  car: GarageRepair["car"];
  client: GarageRepair["client"];
};

const formSchema = insertRepairSchema.pick({
  carId: true,
  description: true,
  servicedAt: true,
});

export default function UpdateRepairForm({ repair, car, client }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carId: car.id,
      description: repair.description,
      servicedAt: toDate(repair.servicedAt),
    },
  });

  const [state, formAction] = useFormState(updateRepair.bind(null, repair.id), {
    errors: [],
  });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit((data) => {
      const formData = new FormData(formRef.current!);
      formData.set("servicedAt", formatISO(data.servicedAt!));
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
          name="carId"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <Label>Car</Label>
              </FormLabel>
              <Select
                disabled
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the car" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key={car.id} value={car.id}>
                    {car.make} {car.model} - {client.name} {client.surname}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the car you want to log a repair for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
