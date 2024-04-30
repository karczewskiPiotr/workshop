"use client";

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
import { ComponentPropsWithoutRef, useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
