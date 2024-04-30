"use client";

import deleteRepair from "@/api/repairs/delete-repair";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import UpdateRepairForm from "./update-repair-form";
import getGarageRepairs from "@/api/repairs/get-garage-repairs";

type GarageRepair = Awaited<ReturnType<typeof getGarageRepairs>>[number];

type Props = {
  repair: GarageRepair["repair"];
  car: GarageRepair["car"];
  client: GarageRepair["client"];
};
export default function RepairDropdown({ repair, car, client }: Props) {
  return (
    <Dialog>
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
          <DropdownMenuItem onSelect={() => deleteRepair(repair.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the repair</DialogTitle>
          <DialogDescription>
            This action will update properties of the repair.
          </DialogDescription>
        </DialogHeader>
        <UpdateRepairForm repair={repair} car={car} client={client} />
      </DialogContent>
    </Dialog>
  );
}
