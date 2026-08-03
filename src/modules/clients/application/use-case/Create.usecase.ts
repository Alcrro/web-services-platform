import { ClientRepository } from "../../domain/repositories/client.repository.interface";
import { IClient } from "../../domain/types/client.types";

export class Create {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(client: IClient): Promise<void> {
    const checkClientExist = await this.clientRepository.findById(client.id!);

    if (!checkClientExist) {
      await this.clientRepository.create(client);
      return;
    }
  }
}
