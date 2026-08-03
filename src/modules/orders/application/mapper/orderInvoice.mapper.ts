import { IServiceOrder } from "../../domain/types/order.types";
import { IServiceOrderDTO } from "../dto/order.dto.types";

export function orderInvoiceOrderDTO(
  order: IServiceOrder & { extraFeaturesTotal: number }
): IServiceOrderDTO {
  return {
    id: order.id,
    orderNo: order.orderNo,
    clientId: order.clientId,
    client: order.client,
    service: order.service,
    serviceId: String(order.serviceId),
    projectName: order.projectName ?? null,
    initialPrice: Number(order.initialPrice),
    totalPrice: Number(order.totalPrice),
    items: !order.items ? undefined : order.items.map((item) => item),
    status: order.status,
    createdAt: order.createdAt,
    extraFeaturesTotal: order.extraFeaturesTotal,
  };
}
