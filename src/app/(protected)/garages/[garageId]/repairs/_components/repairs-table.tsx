import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { UnfoldVertical } from "lucide-react";
import RepairDropdown from "./repair-dropdown";

type Props = {
  repairs: Awaited<ReturnType<typeof getGarageRepairs>>;
  addButton: React.ReactNode;
};

export default function RepairsTable({ repairs, addButton }: Props) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-2">
          <CardTitle>Repairs</CardTitle>
          <CardDescription>Manage client cars in your garage.</CardDescription>
        </div>
        {addButton}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-0 w-0"></TableHead>
              <TableHead>Car</TableHead>
              <TableHead className="max-md:hidden">Registration</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="min-w-0 w-0"></TableHead>
            </TableRow>
          </TableHeader>
          {repairs.map(({ repair, car, client, user }) => (
            <Collapsible key={repair.id} asChild>
              <TableBody className="border-b">
                <TableRow className="border-b-0">
                  <TableCell>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <UnfoldVertical className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      <div className="font-medium">{car.make}</div>
                      <div className="text-xs text-muted-foreground">
                        {car.model}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-md:hidden">
                    <div className="font-medium">
                      <div className="font-medium">{car.licensePlate}</div>
                      <div className="text-xs text-muted-foreground">
                        {car.vinNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      <div className="font-medium">
                        {client.name} {client.surname}
                      </div>
                      {car.fleet && (
                        <div className="text-xs text-muted-foreground">
                          {client.company}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{format(repair.servicedAt, "P")}</TableCell>
                  <TableCell className="text-right">
                    <RepairDropdown repair={repair} car={car} client={client} />
                  </TableCell>
                </TableRow>
                <CollapsibleContent asChild>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={4}>
                      <p>{repair.description}</p>
                      <div className="mt-2 flex gap-4">
                        <p className="text-xs">
                          <span className="text-muted-foreground font-medium">
                            Logged by:
                          </span>{" "}
                          {user.name} {user.surname}
                        </p>
                        {car.fleet && (
                          <p className="text-xs">
                            <span className="text-muted-foreground font-medium">
                              Part of company fleet:
                            </span>{" "}
                            {client.company}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </TableBody>
            </Collapsible>
          ))}
        </Table>
      </CardContent>
    </Card>
  );
}
