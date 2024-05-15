import getGarageCarsCount from "@/api/cars/get-garage-cars-count";
import getGarageClientsCount from "@/api/clients/get-garage-clients-count";
import getGarageEmployeesCount from "@/api/employees/get-garage-employees-count";
import getGarageRepairsCount from "@/api/repairs/get-garage-repairs-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Garage } from "@/db/schema";
import { Car, Users, Wrench } from "lucide-react";

type Props = { garageId: Garage["id"] };

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-5 w-16" />
        </CardTitle>
        <Skeleton className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Skeleton className="h-8 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}

export async function RepairsCard(props: Props) {
  const [{ count }] = await getGarageRepairsCount(props.garageId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Repairs</CardTitle>
        <Wrench className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}

export async function CarsCard(props: Props) {
  const [{ count }] = await getGarageCarsCount(props.garageId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Cars</CardTitle>
        <Car className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}

export async function ClientsCard(props: Props) {
  const [{ count }] = await getGarageClientsCount(props.garageId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Clients</CardTitle>
        <Users className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}

export async function EmployeesCard(props: Props) {
  const [{ count }] = await getGarageEmployeesCount(props.garageId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Employees</CardTitle>
        <Users className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}
