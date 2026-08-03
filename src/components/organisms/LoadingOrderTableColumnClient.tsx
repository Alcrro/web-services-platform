"use client";
import DefaultTableSkeleton from "@/components/skeletons/DefaultTableSkeleton";
import { getOrderColumns } from "@/modules/orders/components/OrderTableColumn";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";

import { FC } from "react";
interface ILoadingServiceOrderTableProps {
  initialData: IServiceOrderTable[];
  meta: number;
  params: Record<string, string | string[]>;
}
const LoadingOrderTableColumnClient: FC<ILoadingServiceOrderTableProps> = ({
  initialData,
  meta,
}) => {
  const columns = getOrderColumns(initialData, true);
  return (
    <DefaultTableSkeleton data={initialData} meta={meta} columns={columns} />
  );
};

export default LoadingOrderTableColumnClient;
