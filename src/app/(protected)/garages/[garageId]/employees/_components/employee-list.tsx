import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import getEmployees from "@/api/employees/get-employees";
import { Garage } from "@/db/schema";
import RevokeAccessDialog from "./revoke-access-dialog";
import validateRequest from "@/api/auth/validate-request";

type Props = {
  employees: Awaited<ReturnType<typeof getEmployees>>;
  owner: Garage["owner"];
  addButton: React.ReactNode;
};

export default async function EmployeeList({
  employees,
  owner,
  addButton,
}: Props) {
  const { user } = await validateRequest();

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
              <TableHead className="text-right">Actions</TableHead>
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
                  <RevokeAccessDialog
                    employeeId={employee.id}
                    buttonProps={{
                      size: "sm",
                      variant: "destructive",
                      disabled: employee.userId === owner || user!.id !== owner,
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
