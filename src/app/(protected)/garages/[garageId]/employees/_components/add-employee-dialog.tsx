import createEmployee from "@/api/employees/create-employee";
import getPotentialEmployees from "@/api/employees/get-potential-employess";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Garage } from "@/db/schema";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type Props = {
  potentialEmployees: Awaited<ReturnType<typeof getPotentialEmployees>>;
  garageId: Garage["id"];
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
};

export default function AddEmployeeDialog({
  garageId,
  potentialEmployees,
  buttonProps = {},
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" {...buttonProps}>
          New employee
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an employee</DialogTitle>
          <DialogDescription>
            This action will cadd an employee to the current garage.
          </DialogDescription>
        </DialogHeader>
        <form
          action={createEmployee.bind(null, garageId)}
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
  );
}
