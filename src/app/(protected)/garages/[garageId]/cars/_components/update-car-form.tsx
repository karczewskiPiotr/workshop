"use client";

import getGarageCars from "@/api/cars/get-garage-cars";
import updateCar from "@/api/cars/update-car";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertCarSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, FormEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  car: Awaited<ReturnType<typeof getGarageCars>>[number];
  onSuccess?: () => void;
};

const formSchema = insertCarSchema.pick({
  make: true,
  model: true,
  licensePlate: true,
  vinNumber: true,
  fleet: true,
});

export default function UpdateCarForm({ car, onSuccess }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: car.make,
      model: car.model,
      licensePlate: car.licensePlate,
      vinNumber: car.vinNumber,
      fleet: car.fleet,
    },
  });

  const [state, formAction] = useFormState(updateCar.bind(null, car.id), {
    errors: [],
    success: false,
  });

  function submitForm(event: FormEvent<HTMLFormElement>) {
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
        onSubmit={submitForm}
        className="space-y-4"
      >
        <FormItem>
          <Label htmlFor="clientId">Owner</Label>
          <Select name="clientId" value={car.clientId!} disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select the owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={car.clientId} value={car.clientId!}>
                {car.clientName} {car.clientSurname}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
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
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
