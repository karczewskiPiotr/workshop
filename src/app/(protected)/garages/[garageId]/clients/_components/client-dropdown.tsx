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
import { ComponentPropsWithoutRef } from "react";
import UpdateClientForm from "./update-client-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type Props = {
  client: Client;
  buttonProps: ComponentPropsWithoutRef<typeof Button>;
};

export default function ClientDropdown({ client, buttonProps }: Props) {
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
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the client</DialogTitle>
          <DialogDescription>
            This action will update client properties.
          </DialogDescription>
        </DialogHeader>
        <UpdateClientForm client={client} />
      </DialogContent>
    </Dialog>
  );
}
