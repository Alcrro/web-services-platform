import { ClientRepository } from "../../domain/repositories/client.repository.interface";
import { IClientsStats } from "../../domain/types/client.types";

export class GetClientsStats {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<IClientsStats> {
    return this.clientRepository.getStats();
  }
}
