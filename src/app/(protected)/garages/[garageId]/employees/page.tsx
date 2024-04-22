import getEmployees from "@/api/employees/get-employees";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import getPotentialEmployees from "@/api/employees/get-potential-employess";
import createEmployee from "@/api/employees/create-employee";

export default async function EmployeesPage({
  params,
}: {
  params: { garageId: string };
}) {
  const employees = await getEmployees(params.garageId);
  const potentialEmployees = await getPotentialEmployees(params.garageId);

  return (
    <>
      <h1>Employees</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">New employee</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an employee</DialogTitle>
            <DialogDescription>
              This action will cadd an employee to the current garage.
            </DialogDescription>
          </DialogHeader>
          <form
            action={createEmployee.bind(null, params.garageId)}
            className="space-y-4"
          >
            <Label htmlFor="userId">User</Label>
            <Select name="userId">
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                {potentialEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} {employee.surname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">Send employment proposal</Button>
          </form>
        </DialogContent>
      </Dialog>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <pre>{JSON.stringify(employee, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
}
