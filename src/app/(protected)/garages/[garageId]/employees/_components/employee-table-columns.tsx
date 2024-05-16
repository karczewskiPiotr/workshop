"use client";

import getEmployees from "@/api/employees/get-employees";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import EmployeeDropdown from "./employee-dropdown";

export type EmployeeColumn = Awaited<
  ReturnType<typeof getEmployees>
>[number] & { isOwner: boolean };

export const columns: ColumnDef<EmployeeColumn>[] = [
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
    id: "status",
    accessorKey: "status",
    cell: ({ getValue }) => (
      <span className="capitalize">{getValue<string>()}</span>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <EmployeeDropdown
        employeeId={row.original.id}
        isOwner={row.original.isOwner}
      />
    ),
  },
];
