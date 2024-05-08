"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import getEmployment from "@/api/employees/get-employment";
import updateEmployee from "@/api/employees/update-employee";
import deleteEmployee from "@/api/employees/delete-employee";
import { Badge } from "@/components/ui/badge";

type Employment = Awaited<ReturnType<typeof getEmployment>>[number];
type Props = { employments: Employment[] };

const columns: ColumnDef<Employment>[] = [
  {
    id: "garage",
    accessorKey: "garage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Garage" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/garages/${row.original.garageId}`}
        className={buttonVariants({ variant: "link" })}
      >
        {row.original.garage}
      </Link>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        className="capitalize"
        variant={row.original.status === "active" ? "default" : "secondary"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end w-full gap-2">
        <Button
          size="sm"
          disabled={row.original.status === "active"}
          onClick={() => updateEmployee(row.original.id, "active")}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => deleteEmployee(row.original.id)}
        >
          {row.original.status !== "active" ? "Leave" : "Reject"}
        </Button>
      </div>
    ),
  },
];

export default function EmploymentsTable({ employments }: Props) {
  return (
    <DataTable
      disableToolbar
      columns={columns}
      data={employments}
      cellAlignment="align-middle"
    />
  );
}
