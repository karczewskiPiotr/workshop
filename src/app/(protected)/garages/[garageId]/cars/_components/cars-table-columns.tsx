"use client";

import getGarageCars from "@/api/cars/get-garage-cars";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import CarDropdown from "./car-dropdown";
import { CircleCheck, CircleX } from "lucide-react";

export type CarColumn = Awaited<ReturnType<typeof getGarageCars>>[number];

export const columns: ColumnDef<CarColumn>[] = [
  {
    id: "make",
    accessorKey: "make",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
  },
  {
    id: "model",
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
  },
  {
    id: "registration",
    accessorKey: "licensePlate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration" />
    ),
  },
  {
    id: "vin",
    accessorKey: "vinNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
  },
  {
    id: "fleet",
    accessorKey: "fleet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fleet" />
    ),
    cell: ({ row }) => {
      return row.original.fleet ? (
        <CircleCheck className="h-5 w-5 mt-1.5" />
      ) : (
        <CircleX className="h-5 w-5 mt-1.5" />
      );
    },
  },
  {
    id: "owner",
    accessorFn: (row) => row.clientName + " " + row.clientSurname,
    cell: ({ row }) => {
      return (
        <span>
          {row.original.clientName} {row.original.clientSurname}
        </span>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CarDropdown car={row.original} />,
  },
];
