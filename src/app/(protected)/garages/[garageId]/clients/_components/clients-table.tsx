import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getClients from "@/api/clients/get-clients";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./clients-table-columns";

type Props = {
  clients: Awaited<ReturnType<typeof getClients>>;
  addButton: React.ReactNode;
};

export default async function ClientsTable({ clients, addButton }: Props) {
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
        <DataTable columns={columns} data={clients} />
      </CardContent>
    </Card>
  );
}
