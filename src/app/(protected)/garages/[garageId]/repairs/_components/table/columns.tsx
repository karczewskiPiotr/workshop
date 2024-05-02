"use client";

import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RepairDropdown from "../repair-dropdown";
import { ArrowUpDown, CircleCheck, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";

export type RepairColumn = Awaited<ReturnType<typeof getGarageRepairs>>[number];

export const columns: ColumnDef<RepairColumn>[] = [
  {
    id: "make",
    accessorFn: (row) => row.car.make,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
  },
  {
    id: "model",
    accessorFn: (row) => row.car.model,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
  },
  {
    id: "registration",
    accessorFn: (row) => row.car.licensePlate,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration" />
    ),
  },
  {
    id: "vin",
    accessorFn: (row) => row.car.vinNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
  },
  {
    id: "fleet",
    accessorFn: (row) => row.car.fleet,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fleet" />
    ),
    cell: ({ row }) => {
      return row.original.car.fleet ? (
        <CircleCheck className="h-5 w-5" />
      ) : (
        <CircleX className="h-5 w-5" />
      );
    },
  },
  {
    id: "client",
    accessorFn: (row) => `${row.client.name} ${row.client.surname}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
  },
  {
    id: "email",
    accessorFn: (row) => row.client.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "date",
    accessorFn: (row) => format(row.repair.servicedAt, "P"),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <RepairDropdown
        repair={row.original.repair}
        car={row.original.car}
        client={row.original.client}
      />
    ),
  },
];
