import {
  IServiceOrder,
  IServiceOrderStatus,
} from "../../../orders/domain/types/order.types";
import { ClientRepository } from "../../domain/repositories/client.repository.interface";

export class FindByStatus {
  constructor(private readonly clientRepository: ClientRepository) {}
  async execute(
    userId: string,
    status: IServiceOrderStatus
  ): Promise<IServiceOrder[]> {
    if (!userId) throw new Error("userId is required!");
    const client = await this.clientRepository.findById(userId.toString());

    if (!client) throw new Error("Client Doesnt exist!");

    if (!client.orders) throw new Error("Orders doesnt exist!");

    const orders = client.orders.filter((element) => element.status === status);

    return orders || [];
  }
}
