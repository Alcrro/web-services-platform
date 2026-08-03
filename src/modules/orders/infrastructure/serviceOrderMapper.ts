import { IServiceOrderTable } from "@/modules/services/domain/types/service.types.ts";
import { ServiceOrder } from "../../../../prisma/app/generated/prisma/client/index";
import {
  statusMapper,
  type IServiceOrder,
  type IServiceOrderStatus,
} from "../../../../src/modules/orders/domain/types/order.types";
import { fromDecimal, toDecimal } from "../../../shared/utils/prismaDecimal.ts";

export function serviceOrderMapperDomainToDoc(
  order: IServiceOrder
): ServiceOrder {
  return {
    id: order.id,
    projectName: order.projectName || "no Name",
    initialPrice: toDecimal(order.initialPrice),
    serviceId: Number(order.serviceId),
    totalPrice: toDecimal(order.totalPrice),
    status: order.status || "NEW",
    clientId: order.clientId,
    requirements: null,
    createdAt: order.createdAt || new Date(),
    updatedAt: new Date(order.updatedAt ?? new Date()) || undefined,
    isDeleted: order.isDeleted,
    deletedAt: order.deletedAt ?? null,
  };
}
export function serviceOrderMapperDocToDom(
  result: ServiceOrder & { orderNo: number }
): IServiceOrder {
  return {
    ...result,
    orderNo: result.orderNo,
    serviceId: result.serviceId.toString(),
    initialPrice: fromDecimal(result.initialPrice),
    totalPrice: fromDecimal(result.totalPrice),
    deletedAt: result.deletedAt ?? undefined,
  };
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

export function serviceOrderStatusMapper(status: IServiceOrderStatus) {
  return statusMapper[status];
}
