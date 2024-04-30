import getEmployees from "@/api/employees/get-employees";
import { Badge } from "@/components/ui/badge";
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
import { Garage } from "@/db/schema";
import EmployeeDropdown from "./employee-dropdown";

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
  return (
    <Card className="xl:col-span-2">
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-0 w-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="font-medium">
                    {employee.name} {employee.surname}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {employee.email}
                  </div>
                </TableCell>
                <TableCell>
                  {employee.userId === owner ? "Owner" : "Employee"}
                </TableCell>
                <TableCell>
                  <Badge className="text-xs capitalize" variant="outline">
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <EmployeeDropdown employeeId={employee.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
