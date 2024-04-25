import updateClient from "@/api/clients/update-client";
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
import { Client } from "@/db/schema";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type Props = {
  client: Client;
  buttonProps: ComponentPropsWithoutRef<typeof Button>;
};

export default function UpdateClientDialog({ client, buttonProps }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" {...buttonProps}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the client</DialogTitle>
          <DialogDescription>
            This action will update client properties.
          </DialogDescription>
        </DialogHeader>
        <form action={updateClient.bind(null, client.id)} className="space-y-4">
          <Label htmlFor="name">Name *</Label>
          <Input name="name" id="name" type="text" defaultValue={client.name} />
          <Label htmlFor="surname">Surname *</Label>
          <Input
            name="surname"
            id="surname"
            type="text"
            defaultValue={client.surname}
          />
          <Label htmlFor="company">Company</Label>
          <Input
            name="company"
            id="company"
            type="text"
            defaultValue={client.company ?? ""}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            defaultValue={client.email ?? ""}
          />
          <Label htmlFor="phone">Phone</Label>
          <Input
            name="phone"
            id="phone"
            type="text"
            defaultValue={client.phone ?? ""}
          />
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
