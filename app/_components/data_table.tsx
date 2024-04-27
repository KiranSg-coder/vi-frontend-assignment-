"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    OnChangeFn,
    RowSelectionState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    ColumnResizeDirection,
    ColumnResizeMode,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setRowSelection: OnChangeFn<RowSelectionState>;
    rowSelection: RowSelectionState;
}
export function DataTable<TData, TValue>({
    columns,
    data,
    rowSelection,
    setRowSelection,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        defaultColumn: {
            minSize: 30,
            maxSize: 1900,
            enableResizing: true,
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // TASK 2 complete : Make first 2 columns (i.e. checkbox and task id) sticky
    // TASK 3 complete : Make header columns resizable

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <TableHead
                                            className={`${
                                                index < 2
                                                    ? "sticky left-0 bg-white z-20"
                                                    : "relative"
                                            } ${index === 1 && "ml-9 left-[50.45px]"}`}
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}

                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className={`resizer ${
                                                    header.column.getIsResizing()
                                                        ? "isResizing"
                                                        : ""
                                                }`}
                                                style={{ cursor: "col-resize" }}
                                            />
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${
                                                index < 2 && "sticky left-0 bg-white z-20"
                                            } ${
                                                index === 1 && "ml-9 left-[50.45px]"
                                            } w-[${cell.column.getSize()}px] min-w-[30px] `}
                                        >
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
