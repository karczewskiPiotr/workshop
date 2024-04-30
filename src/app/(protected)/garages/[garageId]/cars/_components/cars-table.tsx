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
import getGarageCars from "@/api/cars/get-garage-cars";
import { CircleCheck, CircleX } from "lucide-react";
import CarDropdown from "./car-dropdown";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead className="text-right">Fleet</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <div className="font-medium">{car.make}</div>
                  <div className="text-sm text-muted-foreground">
                    {car.model}
                  </div>
                </TableCell>
                <TableCell>{car.licensePlate ?? "—"}</TableCell>
                <TableCell>{car.vinNumber ?? "—"}</TableCell>
                <TableCell>
                  <div className="flex justify-end items-center h-full">
                    {car.fleet ? (
                      <CircleCheck className="h-5 w-5" />
                    ) : (
                      <CircleX className="h-5 w-5" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {car.clientName} {car.clientSurname}
                  </div>
                  {car.fleet && (
                    <div className="text-sm text-muted-foreground">
                      {car.clientCompany}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <CarDropdown
                    car={car}
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
