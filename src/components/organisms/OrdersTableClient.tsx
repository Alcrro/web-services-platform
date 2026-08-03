"use client";
import DefaultTable from "@/components/ui/defaultTable/DefaultTable";
import LoadingOrderTableColumnClient from "./LoadingOrderTableColumnClient";
import { getOrderColumns } from "@/modules/orders/components/OrderTableColumn";
import { useModalStore } from "@/context/modalStore";
import { IMetaPagination } from "@/modules/globals/types/types";
import { useOrders } from "@/shared/hooks/useOrders";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import OrdersFilterBar from "@/modules/orders/components/OrdersFilterBar";

interface Props {
  initialData: IServiceOrderTable[];
  meta: IMetaPagination;
  params: Record<string, string | string[]>;
}

const DefaultTableClient = ({ initialData, meta, params }: Props) => {
  const modals = useModalStore((store) => store.modals);
  const isOpen = !!modals["table"];

  const { data, isLoading, isFetching, isPlaceholderData } = useOrders(
    params,
    meta.page === 1 ? { data: initialData, meta } : undefined
  );

  const tableData = data?.data ?? initialData;
  const tableMeta = data?.meta ?? meta;

  const columns = getOrderColumns(
    tableData as unknown as IServiceOrderTable[],
    isOpen
  );

  const showSkeleton = isLoading || isFetching || isPlaceholderData;

  return (
    <div className="flex flex-col gap-4">
      <OrdersFilterBar />
      {showSkeleton ? (
        <LoadingOrderTableColumnClient
          initialData={initialData}
          meta={tableMeta.totalPages ?? 1}
          params={params}
        />
      ) : (
        <DefaultTable<IServiceOrderTable>
          data={tableData}
          columns={columns}
          meta={tableMeta}
        />
      )}
    </div>
  );
};

export default DefaultTableClient;
