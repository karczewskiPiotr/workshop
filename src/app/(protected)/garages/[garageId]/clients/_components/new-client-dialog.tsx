"use client";

import createClient from "@/api/clients/create-client";
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
import ClientForm from "./client-form";
import { useCallback, useState } from "react";

type Props = { garageId: Garage["id"] };

export default function NewClientDialog({ garageId }: Props) {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto gap-1">
          New client
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a client</DialogTitle>
          <DialogDescription>This action will add a client.</DialogDescription>
        </DialogHeader>
        <ClientForm
          action={createClient.bind(null, garageId)}
          onSuccess={closeDialog}
        >
          <Button type="submit">Add client</Button>
        </ClientForm>
      </DialogContent>
    </Dialog>
  );
}
