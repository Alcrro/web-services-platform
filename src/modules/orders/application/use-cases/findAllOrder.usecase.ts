import { IMetaPagination } from "@/modules/globals/types/types";
import {
  IFiltersServiceOrders,
  IServiceOrder,
} from "../../domain/types/order.types";
import { OrderRepository } from "./../../domain/order.repository.interface";
export class FindAllOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(options?: IFiltersServiceOrders): Promise<{
    data: (IServiceOrder & {
      extraFeaturesTotalPrice: number;
    })[];
    meta: IMetaPagination;
  }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;

    const { data, total } = await this.orderRepository.getAll(options);

    if (!data) {
      throw new Error("Order doesn't found");
    }

    const orderWithExtras = data.map((order) => {
      const extraItems =
        order.items?.filter((f) => f?.type !== "STANDARD") ?? [];

      const calculateExtraFeaturesTotalPrice = extraItems.reduce(
        (sum, i) => sum + Number(i.unitPrice ?? 0),
        0
      );

      return {
        ...order,
        extraFeaturesTotalPrice: Number(calculateExtraFeaturesTotalPrice),
      };
    });
    return {
      data: orderWithExtras,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
