"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { addDays, format } from "date-fns";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@repo/ui/src/@/components/button";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/src/@/components/dropdown-menu";
import { Input } from "@repo/ui/src/@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/src/@/components/table";
import { DataTablePagination } from "./dashboard-data-table-pagination";

export type ITableInterface = {
  id: string;
  patientName: string;
  patientEmail: string;
  bookingDate: Date;
  startingTime: Date;
  endingTime: Date;

  doctorSpecialicity: string | undefined;
};

export const columns: ColumnDef<ITableInterface>[] = [
  {
    accessorKey: "patientName",
    accessorFn: (row) => row.patientName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[17px] font-normal leading-[27px] text-[#434343]">
        {row.getValue("patientName")}
      </div>
    ),
  },
  {
    accessorKey: "patientEmail",
    accessorFn: (row) => row.patientEmail,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {/* Email */}
          Patient Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-[17px] font-normal lowercase leading-[27px] text-[#434343]">
        {row.getValue("patientEmail")}
      </div>
    ),
  },
  {
    accessorKey: "bookingDate",
    header: "Booking Date",
    accessorFn: (row) => row.bookingDate,
    cell: ({ row }) => (
      <div className="text-[17px] font-normal leading-[27px] text-[#434343]">
        {format(new Date(row.getValue("bookingDate")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "startingTime",
    header: "Appointment Time",
    accessorFn: (row) => row.startingTime,

    cell: ({ row }) => (
      <div className="text-[17px] font-normal leading-[27px] text-[#434343]">
        {format(new Date(row.getValue("startingTime")), "hh:mm aa")}-
        {format(new Date(row.original.endingTime), "hh:mm aa")}{" "}
      </div>
    ),
  },
  {
    accessorKey: "doctorSpecialicity",
    header: "Appointment & Mode",
    accessorFn: (row) => row.doctorSpecialicity,
    cell: ({ row }) => (
      <div className="text-[17px] font-normal leading-[27px] text-[#434343]">
        {row.getValue("doctorSpecialicity")}{" "}
        <span className="text-[17px] font-semibold text-secondary">Online</span>
      </div>
    ),
  },
];

const DashboardDataTable = ({
  tableValue,
}: {
  tableValue: ITableInterface[];
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableValue || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full rounded-[9.37px] border border-[#DFE7EF] p-4 sm:p-6 xl:p-5 2xl:p-[26px]">
      <div className="mb-[24px] font-inter text-[24px] text-[#121212] leading-[38px]">Recent Booked Slots</div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Search Patient Name"
          value={(table.getColumn("patientName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("patientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table  >
          <TableHeader  className="bg-[#F9FAFB]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
            {/* {table && table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )} */}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <DataTablePagination table={table}/>
      </div>
    </div>
  );
};

export default DashboardDataTable;
