import { ServiceRepository } from "../../domain/service.repository.interface";
import { IServicesStats } from "../../domain/types/service.types";

export class GetServicesStats {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<IServicesStats> {
    return this.serviceRepository.getServicesStats();
  }
}
