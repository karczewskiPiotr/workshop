import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../../../../../components/ui/data-table/data-table";
import { columns } from "./table/columns";

type Props = {
  repairs: Awaited<ReturnType<typeof getGarageRepairs>>;
  addButton: React.ReactNode;
};

export default function RepairsTable({ repairs, addButton }: Props) {
  return (
    <Card className="xl:col-span-2 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6.5rem)]">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-2">
          <CardTitle>Repairs</CardTitle>
          <CardDescription>Manage client cars in your garage.</CardDescription>
        </div>
        {addButton}
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={repairs} />
      </CardContent>
    </Card>
  );
}
