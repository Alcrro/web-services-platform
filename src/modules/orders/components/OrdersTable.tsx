import { FC } from "react";
import DefaultTableClient from "../../../components/organisms/OrdersTableClient";
import { mapOrdersSearchParams } from "@/modules/orders/infrastructure/searchParamsToFilter";
import { OrdersAction } from "../application/orders.action";

interface PageProps {
  searchParams?: Record<string, string | string[]>;
}

const OrdersTable: FC<PageProps> = async ({ searchParams = {} }) => {
  const params = mapOrdersSearchParams(searchParams);
  const ordersAction = new OrdersAction();
  const { data, meta } = await ordersAction.getAllTableOrdersWithParams(params);

  return (
    <DefaultTableClient initialData={data} meta={meta} params={searchParams} />
  );
};

export default OrdersTable;
