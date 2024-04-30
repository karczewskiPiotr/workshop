"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Client } from "@/db/schema";
import { Plus } from "lucide-react";
import NewCarForm from "./new-car-form";
import { useState } from "react";

type Props = { clients: Client[] };

export default function NewCarDialog({ clients }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto gap-1">
          New car
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a car</DialogTitle>
          <DialogDescription>This action will add a car.</DialogDescription>
        </DialogHeader>
        <NewCarForm closeDialog={() => setOpen(false)} clients={clients} />
      </DialogContent>
    </Dialog>
  );
}
