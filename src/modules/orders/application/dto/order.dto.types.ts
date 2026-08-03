import { IServiceOrder } from "../../domain/types/order.types";

// dto/service-order.dto.ts
export type IServiceOrderDTO = Omit<
  IServiceOrder,
  "serviceId" | "isDeleted" | "createdAt" | "totalPrice" | "initialPrice"
> & {
  serviceId: string;
  initialPrice: number;
  totalPrice: number;
  createdAt: Date;
  orderNo: number;
  extraFeaturesTotal: number;
};
