import createClient from "@/api/clients/create-client";
import { Button } from "@/components/ui/button";
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
import { Garage } from "@/db/schema";
import { Plus } from "lucide-react";

type Props = { garageId: Garage["id"] };

export default function NewClientDialog({ garageId }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto gap-1">
          New client
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a client</DialogTitle>
          <DialogDescription>This action will add a client.</DialogDescription>
        </DialogHeader>
        <form action={createClient.bind(null, garageId)} className="space-y-4">
          <Label htmlFor="name">Name *</Label>
          <Input name="name" id="name" type="text" />
          <Label htmlFor="surname">Surname *</Label>
          <Input name="surname" id="surname" type="text" />
          <Label htmlFor="company">Company</Label>
          <Input name="company" id="company" type="text" />
          <Label htmlFor="email">Email</Label>
          <Input name="email" id="email" type="email" />
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" id="phone" type="text" />
          <Button type="submit">Add a client</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
