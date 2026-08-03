import { ClientRepository } from "@/modules/clients/domain/repositories/client.repository.interface";

export class FindAllByClient {
  constructor(
    private readonly clientRepository: ClientRepository // private readonly orderRepository: OrderRepository
  ) {}

  async execute(clientId: string) {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new Error("no client");
    }

    const orders = client.orders;

    return orders;
  }
}
