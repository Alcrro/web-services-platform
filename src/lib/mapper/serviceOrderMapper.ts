import { IServiceOrderItem } from "@/modules/orders/domain/types/order.types";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";

export const selectedOptionMapper = (
  feature: IServiceFeature
): IServiceOrderItem => {
  return {
    id: feature.id,
    orderId: "",
    name: feature?.feature?.name ?? "Feature unknown",
    description: feature.description,
    uniqueId: feature.uniqueId,
    quantity: feature.quantity ?? 1,
    type: feature.type,
    unitPrice: Number(feature.unitPrice),
    totalPrice: Number(feature.unitPrice * feature.quantity),
    showPrice: feature.type === "OPTIONAL",
    createdAt: new Date(),
  };
};
