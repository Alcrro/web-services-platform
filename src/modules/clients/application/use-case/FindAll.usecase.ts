import { ICLientFIlters } from "../../domain/types/client.types";
import { ClientRepository } from "../../domain/repositories/client.repository.interface";
import { FindClientDTO } from "../dto/FindClientDTO";
import { entitiesToFindClients } from "../mapper/client.mapper";

export class FindAllUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(options: ICLientFIlters): Promise<FindClientDTO> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const { data, total } = await this.clientRepo.getAll(options);

    return {
      data: entitiesToFindClients(data),
      metadata: {
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
