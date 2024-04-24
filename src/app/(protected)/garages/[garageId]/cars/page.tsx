import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import createCar from "@/api/cars/create-car";
import getGarageCars from "@/api/cars/get-garage-cars";
import getClients from "@/api/clients/get-clients";
import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";

export default async function CarsPage({
  params,
}: {
  params: { garageId: string };
}) {
  const [garage] = await getGarage(params.garageId);
  const cars = await getGarageCars(params.garageId);
  const clients = await getClients(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "cars");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name, link: `/garages/${params.garageId}` },
    { label: "Cars" },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <h1>Cars</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">New car</Button>
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
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <pre>{JSON.stringify(car, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </Dashboard>
  );
}
