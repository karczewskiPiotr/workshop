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
import { Garage } from "@/db/schema";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import NewEmployeeForm from "./new-employee-form";

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
        <NewEmployeeForm
          garageId={garageId}
          employeesPool={potentialEmployees}
        />
      </DialogContent>
    </Dialog>
  );
}
