"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "@/components/styles/tableView.module.scss";

import { cn } from "@/lib/utils";
import { PaginationSkeleton } from "./PaginationSkeleton";
import { Fragment } from "react/jsx-runtime";

interface TableColumnMeta {
  className?: React.CSSProperties;
}

const DefaultTableSkeleton = <T, TValue = unknown>({
  data,
  meta,
  columns,
}: {
  data: T[];
  meta: number;
  columns: ColumnDef<T, TValue>[];
}) => {
  const table = useReactTable({
    data: data,
    meta: meta,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) =>
      (row as T & { additionalItems?: T[] }).additionalItems ?? [],
  });
  return (
    <div className="overflow-x-auto w-full">
      <div className="hidden sm:block ">
        <table className="min-w-full h-[600px]">
          <thead className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-center text-sm font-medium "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700 border-collapse max-h-[600px] min-h-full overflow-y-auto ">
            {table.getRowModel().rows.map((row, rowIndex) => {
              const isFirstRow = rowIndex === 0;
              const isLastRow =
                rowIndex === table.getRowModel().rows.length - 1;
              return (
                <Fragment key={row.id}>
                  <tr
                    className={` cursor transition-colors   ${
                      isLastRow ? "rounded-b-lg" : ""
                    } ${isFirstRow ? "rounded-t-lg" : ""}`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const isFirstCell = cellIndex === 0;
                      const isLastCell =
                        cellIndex === row.getVisibleCells().length - 1;

                      const cellValue = cell.getValue();
                      const hasContent =
                        cellValue !== null &&
                        cellValue !== undefined &&
                        String(cellValue).trim().length > 0;

                      return (
                        <td
                          key={cell.id}
                          className={cn(
                            "px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-300",
                            (cell.column.columnDef.meta as TableColumnMeta)
                              ?.className,
                            isFirstRow && isFirstCell && "rounded-tl-lg",
                            isFirstRow && isLastCell && "rounded-tr-lg",
                            isLastRow &&
                              isFirstCell &&
                              data.length === 10 &&
                              "rounded-bl-lg",
                            isLastRow &&
                              isLastCell &&
                              data.length === 10 &&
                              "rounded-br-lg"
                          )}
                        >
                          <span
                            className={cn(
                              "text-transparent", // dark mode default
                              hasContent &&
                                "text-transparent bg-gray-300 rounded-2xl text-center animate-pulse" // gray + pulse for text
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() &&
                    row.subRows.map((subRow) => (
                      <tr
                        key={subRow.id}
                        className="bg-gray-50 dark:bg-gray-800"
                      >
                        {subRow.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-300 "
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
            {/* 👇 Placeholder row to fill remaining height */}
            {table.getRowModel().rows.length < 10 && (
              <tr
                data-rows-missing={10 - table.getRowModel().rows.length}
                className={styles.tableFiller}
              >
                <td
                  className="rounded-b-xl"
                  colSpan={table.getAllColumns().length}
                ></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="block sm:hidden">
        <table className="min-w-full ">
          <tbody className=""></tbody>
        </table>
      </div>

      <div className="bts flex justify-center gap-4 py-2">
        <PaginationSkeleton totalPages={meta} />
      </div>
    </div>
  );
};

export default DefaultTableSkeleton;
