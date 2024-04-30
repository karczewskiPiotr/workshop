import updateClient from "@/api/clients/update-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client } from "@/db/schema";

type Props = { client: Client };

export default function UpdateClientForm({ client }: Props) {
  return (
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
  );
}
