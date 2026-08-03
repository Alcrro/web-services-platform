import { ServiceRepository } from "../../domain/service.repository.interface";

export class RemoveServiceFeature {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(serviceId: string, featureId: string): Promise<void> {
    if (!serviceId || !featureId) {
      throw new Error("serviceId and featureId are required");
    }
    await this.serviceRepository.deleteServiceFeature(serviceId, featureId);
  }
}
