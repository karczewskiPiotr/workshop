import createCar from "@/api/cars/create-car";
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
import { Client } from "@/db/schema";
import { Plus } from "lucide-react";

type Props = { clients: Client[] };

export default function NewCarDialog({ clients }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto gap-1">
          New car
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a car</DialogTitle>
          <DialogDescription>This action will add a car.</DialogDescription>
        </DialogHeader>
        <form action={createCar} className="space-y-4">
          <Label htmlFor="clientId">Owner</Label>
          <Select name="clientId">
            <SelectTrigger>
              <SelectValue placeholder="Select the owner" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name} {client.surname}
                </SelectItem>
              ))}
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
          <Button type="submit">Add a car</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
