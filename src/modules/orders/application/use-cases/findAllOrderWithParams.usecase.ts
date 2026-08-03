import { IMetaPagination } from "@/modules/globals/types/types";
import {
  IOrdersQueryParams,
  IServiceOrder,
} from "../../domain/types/order.types";
import { OrderRepository } from "../../domain/order.repository.interface";

export class FindAllOrderWithParams {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(params: IOrdersQueryParams): Promise<{
    data: (IServiceOrder & { extraFeaturesTotalPrice: number })[];
    meta: IMetaPagination;
  }> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const { data, total } = await this.orderRepository.getAllWithParams(params);

    const orderWithExtras = data.map((order) => {
      const extraItems =
        order.items?.filter((f) => f?.type !== "STANDARD") ?? [];
      const extraFeaturesTotalPrice = extraItems.reduce(
        (sum, i) => sum + Number(i.unitPrice ?? 0),
        0
      );
      return { ...order, extraFeaturesTotalPrice };
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
