import { OrderRepository } from "../../domain/order.repository.interface";
import { IServiceOrder } from "../../domain/types/order.types";

export class FindOne {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    orderId: string
  ): Promise<IServiceOrder & { extraFeaturesTotal: number }> {
    const orderDTO = await this.orderRepository.findById(orderId);

    if (!orderDTO) throw new Error("no order");
    if (!orderDTO.items) throw new Error("no items");
    // const orderEntity = new Order(orderDTO);

    const extras = orderDTO.items.filter((item) => item.type !== "STANDARD");

    const calculateTotalExtraFeatures = extras.reduce(
      (sum, i) => (!i.unitPrice ? 0 : sum + Number(i.unitPrice)),
      0
    );

    return {
      ...orderDTO,
      extraFeaturesTotal: calculateTotalExtraFeatures,
    };
  }
}
