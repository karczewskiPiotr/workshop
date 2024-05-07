"use client";

import { X } from "lucide-react";
import { Column, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [filterTarget, setFilterTarget] = useState<Column<TData>>();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Select
          onValueChange={(value) =>
            setFilterTarget(table.getColumn(value) as Column<TData>)
          }
        >
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            {table.getAllColumns().map((column) => (
              <SelectItem
                key={column.id}
                value={column.id}
                className="capitalize"
              >
                {column.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter..."
          value={(filterTarget?.getFilterValue() as string) ?? ""}
          onChange={(event) => filterTarget?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("fleet") && (
          <DataTableFacetedFilter
            column={table.getColumn("fleet")}
            title="Fleet"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
