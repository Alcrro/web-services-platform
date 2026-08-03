import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import {
  IFeature,
  IPricingConfigInput,
  IServiceFeature,
  IServicePricingConfig,
} from "../domain/types/service.types";
import { UpsertServiceFeatureInput } from "../application/usecases/UpsertServiceFeature.usecase";

type AddFeaturePayload = Omit<UpsertServiceFeatureInput, "serviceId">;

type UpdateFeaturePayload = {
  type: IServiceFeature["type"];
  hours: number;
  unitPrice: number;
  isIncluded: boolean;
  quantity?: number;
};

export class AdminServicesAPI extends BaseAPI {
  protected BASE_PATH = "/api/admin";

  async getAllFeatures(): Promise<IFeature[]> {
    return this.request("/features", { method: "GET" });
  }

  async addServiceFeature(
    serviceUniqueId: string,
    data: AddFeaturePayload
  ): Promise<IServiceFeature> {
    return this.request(`/services/${serviceUniqueId}/features`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async updateServiceFeature(
    serviceUniqueId: string,
    featureId: string,
    data: UpdateFeaturePayload
  ): Promise<IServiceFeature> {
    return this.request(`/services/${serviceUniqueId}/features/${featureId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async removeServiceFeature(
    serviceUniqueId: string,
    featureId: string
  ): Promise<void> {
    await this.request(`/services/${serviceUniqueId}/features/${featureId}`, {
      method: "DELETE",
    });
  }

  async upsertPricingConfig(
    serviceUniqueId: string,
    data: IPricingConfigInput
  ): Promise<IServicePricingConfig> {
    return this.request(`/services/${serviceUniqueId}/pricing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}
