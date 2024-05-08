"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table/data-table";
import getGarages from "@/api/garages/get-garages";
import { buttonVariants } from "@/components/ui/button";

type Garage = Awaited<ReturnType<typeof getGarages>>[number];
type Props = { garages: Garage[] };

const columns: ColumnDef<Garage>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/garages/${row.original.id}`}
        className={buttonVariants({ variant: "link" })}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    id: "owner",
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
];

export default function GaragesTable({ garages }: Props) {
  return (
    <DataTable
      disableToolbar
      columns={columns}
      data={garages}
      cellAlignment="align-middle"
    />
  );
}
