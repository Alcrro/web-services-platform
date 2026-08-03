import { ServiceRepository } from "../../domain/service.repository.interface";
import {
  IPricingConfigInput,
  IServicePricingConfig,
} from "../../domain/types/service.types";

export class UpsertPricingConfig {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(
    serviceId: string,
    data: IPricingConfigInput
  ): Promise<IServicePricingConfig> {
    if (!serviceId) throw new Error("serviceId is required");
    return this.serviceRepository.upsertPricingConfig(serviceId, data);
  }
}
