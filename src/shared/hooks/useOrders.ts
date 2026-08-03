"use client";
// hooks/useOrders.ts
import { useQuery } from "@tanstack/react-query";
import type { IMetaPagination } from "@/modules/globals/types/types";
import {
  statusMapper,
  type IServiceOrder,
  type IServiceOrderStatus,
} from "@/modules/orders/domain/types/order.types";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import { fetchTableOrders } from "@/modules/orders/infrastructure/order.client";

export function useOrders(
  params: Record<string, string | string[]>,
  initialData?: { data: IServiceOrderTable[]; meta: IMetaPagination }
) {
  return useQuery<{ data: IServiceOrderTable[]; meta: IMetaPagination }, Error>(
    {
      queryKey: ["orders", params],
      queryFn: async () => fetchTableOrders(params),
      staleTime: 1000 * 60,
      initialData,
      placeholderData: (previousData) => previousData,
    }
  );
}

export function ordersTableMapper(
  order: IServiceOrder & { extraFeaturesTotalPrice: number }
): IServiceOrderTable {
  return {
    id: order.id,
    orderNo: order.orderNo,
    projectName: order.projectName ?? "no Name",
    serviceName: order.service?.name ?? "no Name",
    clientName: order.client?.name ?? "no Name",
    uniqueServiceId: order.service?.uniqueId ?? "",
    status: serviceOrderStatusMapper(order.status) ?? "new",
    initialPrice: Number(order.initialPrice),
    requirements: order.requirements ?? "",
    totalPrice: order.totalPrice,
    extraFeaturesTotalPrice: order.extraFeaturesTotalPrice,
    createdAt: new Date(order.createdAt).toLocaleDateString(),
    includedFeatures:
      order.items?.filter((item) => item.type === "STANDARD") ?? [],
    extraFeatures:
      order.items?.filter((item) => item.type !== "STANDARD") ?? [],
    items: order.items?.length
      ? order.items.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type || "OTHER",
          quantity: item.quantity,
          unitPrice: item.unitPrice ?? 0,
          showPrice: item.showPrice,
          orderId:
            typeof item.order === "object" ? item.order.id : item.order ?? "",
          createdAt: item.createdAt,
        }))
      : undefined,
  };
}

function serviceOrderStatusMapper(status: IServiceOrderStatus) {
  return statusMapper[status];
}
