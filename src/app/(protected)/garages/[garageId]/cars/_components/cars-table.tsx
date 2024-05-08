import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getGarageCars from "@/api/cars/get-garage-cars";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./cars-table-columns";

type Props = {
  cars: Awaited<ReturnType<typeof getGarageCars>>;
  addButton: React.ReactNode;
};

export default async function CarsTable({ cars, addButton }: Props) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Cars</CardTitle>
          <CardDescription>Manage client cars in your garage.</CardDescription>
        </div>
        {addButton}
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={cars} />
      </CardContent>
    </Card>
  );
}
