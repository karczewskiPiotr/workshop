import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getClients from "@/api/clients/get-clients";
import UpdateClientDialog from "./update-client-dialog";

type Props = {
  clients: Awaited<ReturnType<typeof getClients>>;
  addButton: React.ReactNode;
};

export default async function ClientsList({ clients, addButton }: Props) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Clients</CardTitle>
          <CardDescription>Manage the clients of your garage.</CardDescription>
        </div>
        {addButton}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="font-medium">
                    {client.name} {client.surname}
                  </div>
                </TableCell>
                <TableCell>{client.email ?? "—"}</TableCell>
                <TableCell>{client.phone ?? "—"}</TableCell>
                <TableCell>{client.company ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <UpdateClientDialog
                    client={client}
                    buttonProps={{
                      size: "sm",
                      className: "ml-auto gap-1",
                      variant: "outline",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
