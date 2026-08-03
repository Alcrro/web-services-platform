import { IServiceOrder } from "../types/order.types";

export class Order {
  constructor(private readonly order: IServiceOrder) {
    this.order = order;
  }

  createOrder(): IServiceOrder {
    return {
      ...this.order,
    };
  }

  toJson() {
    return { ...this.order };
  }
}
