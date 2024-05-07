"use client";

import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RepairDropdown from "../repair-dropdown";
import { CircleCheck, CircleX } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../../../components/ui/data-table/data-table-column-header";

export type RepairColumn = Awaited<ReturnType<typeof getGarageRepairs>>[number];

export const columns: ColumnDef<RepairColumn>[] = [
  {
    id: "make",
    accessorFn: (row) => row.car.make,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "model",
    accessorFn: (row) => row.car.model,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "registration",
    accessorFn: (row) => row.car.licensePlate,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "vin",
    accessorFn: (row) => row.car.vinNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "description",
    accessorFn: (row) => row.repair.description,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[60ch] min-w-[45ch] mt-1.5">
        {row.original.repair.description}
      </p>
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
        <CircleCheck className="h-5 w-5 mt-1.5" />
      ) : (
        <CircleX className="h-5 w-5 mt-1.5" />
      );
    },
  },
  {
    id: "client",
    accessorFn: (row) => `${row.client.name} ${row.client.surname}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "email",
    accessorFn: (row) => row.client.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
    ),
  },
  {
    id: "date",
    accessorFn: (row) => format(row.repair.servicedAt, "P"),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ cell: { getValue } }) => (
      <p className="mt-1.5">{getValue<string>()}</p>
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
