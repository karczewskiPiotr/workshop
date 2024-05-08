"use client";

import getClients from "@/api/clients/get-clients";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import ClientDropdown from "./client-dropdown";

export type ClientsColumn = Awaited<ReturnType<typeof getClients>>[number];

export const columns: ColumnDef<ClientsColumn>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "surname",
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Surname" />
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientDropdown client={row.original} />,
  },
];
