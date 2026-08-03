"use client";
import { ColumnDef } from "@tanstack/react-table";
import { createColumnRegistry } from "./orderTableColumns/columnCellsRegistry";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";

const columnCellsRegistry = createColumnRegistry<IServiceOrderTable>();
export const getOrderColumns = (
  data: IServiceOrderTable[],
  isLoading?: boolean
): ColumnDef<IServiceOrderTable>[] => [
  { ...columnCellsRegistry.expander() },
  { ...columnCellsRegistry.projectName() },
  { ...columnCellsRegistry.serviceName(), meta: { data } },
  { ...columnCellsRegistry.status(), meta: { data } },
  { ...columnCellsRegistry.initialPrice() },
  { ...columnCellsRegistry.includedFeatures(isLoading) },
  { ...columnCellsRegistry.extraFeatures(isLoading) },
  { ...columnCellsRegistry.extraFeaturesTotalPrice() },
  { ...columnCellsRegistry.totalPrice() },
  { ...columnCellsRegistry.createdAt() },
  { ...columnCellsRegistry.actions() },
];
