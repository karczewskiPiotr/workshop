"use client";

import getGarageCars from "@/api/cars/get-garage-cars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import UpdateCarForm from "./update-car-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteCar from "@/api/cars/delete-repair";

type Props = {
  car: Awaited<ReturnType<typeof getGarageCars>>[number];
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
};

export default function CarDropdown({ car }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update the car</DialogTitle>
            <DialogDescription>
              This action will update properties of the car.
            </DialogDescription>
          </DialogHeader>
          <UpdateCarForm car={car} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove the car from the
            garage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCar(car.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
