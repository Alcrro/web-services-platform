import { ServiceRepository } from "../../domain/service.repository.interface";
import {
  IFeatureType,
  IServiceFeature,
} from "../../domain/types/service.types";

export interface UpsertServiceFeatureInput {
  serviceId: string;
  featureId?: string;
  featureName?: string;
  type: IFeatureType;
  hours: number;
  unitPrice: number;
  isIncluded: boolean;
  quantity?: number;
}

export class UpsertServiceFeature {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(input: UpsertServiceFeatureInput): Promise<IServiceFeature> {
    let featureId = input.featureId;

    if (!featureId) {
      if (!input.featureName?.trim()) {
        throw new Error("featureId or featureName is required");
      }
      const newFeature = await this.serviceRepository.createFeature(
        input.featureName.trim(),
        crypto.randomUUID()
      );
      featureId = newFeature.id;
    }

    return this.serviceRepository.upsertServiceFeature({
      serviceId: input.serviceId,
      featureId,
      type: input.type,
      hours: input.hours,
      unitPrice: input.unitPrice,
      isIncluded: input.isIncluded,
      quantity: input.quantity ?? 1,
    });
  }
}
