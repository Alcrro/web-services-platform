import { IFilters } from "@/modules/globals/types/types";
import { IServiceOrderItem } from "./types/order.types";

export interface ServiceOrderItemRepository {
  create(orderItem: IServiceOrderItem): Promise<IServiceOrderItem>;
  findOne(itemId: string): Promise<IServiceOrderItem | null>;
  findAll(
    options: IFilters<IServiceOrderItem>
  ): Promise<IServiceOrderItem[] | null>;
  update(
    orderId: string,
    data: Partial<IServiceOrderItem>
  ): Promise<IServiceOrderItem>;
}
