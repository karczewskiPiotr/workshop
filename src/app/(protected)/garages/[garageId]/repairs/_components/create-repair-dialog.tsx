"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Garage, User, cars } from "@/db/schema";
import RepairForm from "./create-repair-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import getGarageCars from "@/api/cars/get-garage-cars";
import { useState } from "react";

type Props = {
  userId: User["id"];
  garageId: Garage["id"];
  cars: Awaited<ReturnType<typeof getGarageCars>>;
};

export default function CreateRepairDialog({ cars, garageId, userId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto gap-1">
          Log repair
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a repair</DialogTitle>
          <DialogDescription>This action will add a repair.</DialogDescription>
        </DialogHeader>
        <RepairForm
          cars={cars}
          garageId={garageId}
          userId={userId}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
