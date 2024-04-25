import createCar from "@/api/cars/create-car";
import getGarageCars from "@/api/cars/get-garage-cars";
import updateCar from "@/api/cars/update-car";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type Props = {
  car: Awaited<ReturnType<typeof getGarageCars>>[number];
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
};

export default function UpdateCarDialog({ car, buttonProps }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...buttonProps}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the car</DialogTitle>
          <DialogDescription>
            This action will update properties of the car.
          </DialogDescription>
        </DialogHeader>
        <form action={updateCar.bind(null, car.id)} className="space-y-4">
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
          <Label htmlFor="make">Make *</Label>
          <Input name="make" id="make" type="text" />
          <Label htmlFor="model">Model *</Label>
          <Input name="model" id="model" type="text" />
          <Label htmlFor="licensePlate">License plate</Label>
          <Input name="licensePlate" id="licensePlate" type="text" />
          <Label htmlFor="vinNumber">VIN number</Label>
          <Input name="vinNumber" id="vinNumber" type="text" />
          <div className="flex items-center space-x-2">
            <Checkbox name="fleet" id="fleet" />
            <Label
              htmlFor="fleet"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Part of company fleet?
            </Label>
          </div>
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
