"use client";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "@/components/styles/tableView.module.scss";
import { cn } from "@/lib/utils";
import { IMetaPagination } from "@/modules/globals/types/types";
import PaginationV2 from "./pagination/PavinationV2";
import React from "react";
import { useGoToPage } from "@/shared/utils/goToPage";

export type TableProps<T = unknown, TValue = unknown> = {
  data: T[];
  columns: ColumnDef<T, TValue>[];
  meta: IMetaPagination;
  className?: string;
};
interface ColumnMeta {
  className?: React.CSSProperties;
}
const DefaultTable = <T,>({ data, columns, meta }: TableProps<T>) => {
  const memoColumns = React.useMemo(() => columns, [columns]);
  const memoData = React.useMemo(() => data, [data]);

  const currentPage = React.useMemo(() => meta.page ?? 1, [meta.page]);
  const goToPage = useGoToPage();
  const table = useReactTable({
    data: memoData,
    meta: meta,
    columns: memoColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = React.useMemo(
    () => meta.totalPages ?? 1,
    [meta.totalPages]
  );

  return (
    <div className="w-full rounded-xl border border-(--color-border) overflow-hidden"
      style={{ background: "var(--color-bg-section)", boxShadow: "0 4px 24px -8px rgba(0,0,0,0.3)" }}
    >
      {/* Desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-(--color-border)"
                style={{ background: "color-mix(in srgb, var(--color-bg) 60%, var(--color-bg-section))" }}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-center text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-(--color-border)">
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="transition-colors hover:bg-(--color-bg-hover)">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "px-4 py-3 text-center text-sm text-(--color-text)",
                        (cell.column.columnDef.meta as ColumnMeta)?.className
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() &&
                  row.subRows.map((subRow) => (
                    <tr key={subRow.id} className="bg-(--color-bg-hover)">
                      {subRow.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 text-center text-sm text-(--color-text)">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
            {table.getRowModel().rows.length < 10 && (
              <tr className={styles.tableFiller}>
                <td colSpan={table.getAllColumns().length} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="block sm:hidden divide-y divide-(--color-border)">
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <div className="p-4 flex flex-col gap-2">
              {row.getVisibleCells().map((cell) => {
                const headerText = typeof cell.column.columnDef.header === "string"
                  ? cell.column.columnDef.header
                  : cell.column.id;
                return (
                  <div key={cell.id} className="flex justify-between items-center gap-2">
                    <span className="text-xs text-(--color-text-secondary) font-medium uppercase tracking-wider shrink-0">
                      {headerText}
                    </span>
                    <span className="text-sm text-(--color-text) text-right">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center gap-4 py-3 border-t border-(--color-border)"
        style={{ background: "color-mix(in srgb, var(--color-bg) 60%, var(--color-bg-section))" }}
      >
        <PaginationV2
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};
export default DefaultTable;
