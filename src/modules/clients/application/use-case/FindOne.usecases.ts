import { ClientRepository } from "../../domain/repositories/client.repository.interface";
import { IClient } from "../../domain/types/client.types";

export class FindOne {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(clientId: string): Promise<IClient> {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new Error("Client not found!");
    }
    return client;
  }
}
