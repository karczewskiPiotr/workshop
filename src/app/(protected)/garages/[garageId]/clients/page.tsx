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

import createClient from "@/api/clients/create-client";
import { Input } from "@/components/ui/input";
import getClients from "@/api/clients/get-clients";

export default async function ClientsPage({
  params,
}: {
  params: { garageId: string };
}) {
  const clients = await getClients(params.garageId);

  return (
    <>
      <h1>Clients</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">New client</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a client</DialogTitle>
            <DialogDescription>
              This action will add a client.
            </DialogDescription>
          </DialogHeader>
          <form
            action={createClient.bind(null, params.garageId)}
            className="space-y-4"
          >
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
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <pre>{JSON.stringify(client, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
}
