import getEmployees from "@/api/employees/get-employees";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Garage } from "@/db/schema";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./employee-table-columns";
import { useMemo } from "react";

type Props = {
  employees: Awaited<ReturnType<typeof getEmployees>>;
  owner: Garage["owner"];
  addButton: React.ReactNode;
};

export default async function EmployeeTable({
  employees,
  owner,
  addButton,
}: Props) {
  const data = useMemo(() => {
    return employees.map((employee) => ({
      ...employee,
      isOwner: owner === employee.userId,
    }));
  }, [employees]);

  return (
    <Card className="xl:col-span-2 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6.5rem)]">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Employees</CardTitle>
          <CardDescription>
            Manage the employees of your garage.
          </CardDescription>
        </div>
        {addButton}
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
