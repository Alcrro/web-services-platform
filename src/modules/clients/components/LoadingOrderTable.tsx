import { mapOrdersSearchParams } from "@/modules/orders/infrastructure/searchParamsToFilter";
import LoadingOrderTableColumnClient from "../../../components/organisms/LoadingOrderTableColumnClient";
import { OrdersAction } from "@/modules/orders/application/orders.action";

const LoadingOrderTable = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) => {
  const params = searchParams || {};

  const ordersAction = new OrdersAction();
  const orders = await ordersAction.getAllTableOrdersWithParams(
    mapOrdersSearchParams(params)
  );

  const { data, meta } = orders;

  const totalPages = Math.max(1, meta?.totalPages ?? 1);

  return (
    <LoadingOrderTableColumnClient
      initialData={data}
      meta={totalPages}
      params={params}
    />
  );
};

export default LoadingOrderTable;
