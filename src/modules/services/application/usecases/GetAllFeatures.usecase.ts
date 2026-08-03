import { ServiceRepository } from "../../domain/service.repository.interface";
import { IFeature } from "../../domain/types/service.types";

export class GetAllFeatures {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<IFeature[]> {
    return this.serviceRepository.getAllFeatures();
  }
}
