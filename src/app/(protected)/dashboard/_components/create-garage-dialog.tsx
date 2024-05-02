"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateGarageForm from "./create-garage-form";
import { User } from "@/db/schema";
import { useState } from "react";

type Props = { userId: User["id"] };

export default function CreateGarageDialog({ userId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create a garage</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new garage</DialogTitle>
          <DialogDescription>
            This action will create a new garage and assign you as the owner.
          </DialogDescription>
        </DialogHeader>
        <CreateGarageForm userId={userId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
