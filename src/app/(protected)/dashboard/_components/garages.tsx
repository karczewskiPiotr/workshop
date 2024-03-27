import createGarage from "@/api/garages/create";
import getAllGarages from "@/api/garages/get-all";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { User } from "@/db/schema";

export default async function Garages(props: { userId: User["id"] }) {
  const garages = await getAllGarages(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Garages</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {garages.map((garage) => (
            <li key={garage.id}>{garage.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create a garage</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new garage</DialogTitle>
              <DialogDescription>
                This action will create a new garage and assign you as the
                owner.
              </DialogDescription>
            </DialogHeader>
            <form action={createGarage.bind(null, props.userId)}>
              <Label htmlFor="name">Garage name</Label>
              <Input id="name" name="name" type="text" />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
