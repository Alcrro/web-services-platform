import { IMetaPagination } from "@/modules/globals/types/types";
import { IServiceOrder } from "../domain/types/order.types";
import { mapOrdersSearchParams } from "./searchParamsToFilter";
import { OrdersAPI } from "./order.api";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import { ordersTableMapper } from "./servicecOrderMapper.client";

const ordersAPI = new OrdersAPI();

export async function fetchTableOrders(
  params: Record<string, string | string[]>
): Promise<{ data: IServiceOrderTable[]; meta: IMetaPagination }> {
  const result = await ordersAPI.findAllOrdersWithParams<
    IServiceOrder & { extraFeaturesTotalPrice: number }
  >(mapOrdersSearchParams(params));

  return {
    data: result.data.map(ordersTableMapper),
    meta: result.meta,
  };
}
