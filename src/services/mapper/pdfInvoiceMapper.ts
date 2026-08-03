import { IServiceOrder } from "@/modules/orders/domain/types/order.types";
import {
  Client,
  ServiceOrder,
} from "@prisma/client";

export interface IPServiceOrder {
  order: ServiceOrder & {
    orderNo: number;
    client: Client;
  };
}
export function pdfInvoiceMapper(order: IPServiceOrder): IServiceOrder {
  return {
    id: order.order.id,
    orderNo: order.order.orderNo,
    serviceId: order.order.serviceId.toString(),
    clientId: order.order.clientId,
    status: order.order.status,
    initialPrice: Number(order.order.initialPrice),
    totalPrice: Number(order.order.totalPrice),
    createdAt: order.order.createdAt,
    projectName: order.order.projectName,
    isDeleted: order.order.isDeleted,
  };
}
