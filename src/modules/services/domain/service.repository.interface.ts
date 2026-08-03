import {
  IFeature,
  IFilterServices,
  IPricingConfigInput,
  IService,
  IServiceFeature,
  IServicePricingConfig,
  IServicesStats,
  IUpsertServiceFeatureInput,
} from "./types/service.types";

export interface ServiceRepository {
  create(service: IService): Promise<IService>;
  findById(serviceId: string): Promise<IService | null>;
  findAll(options?: IFilterServices): Promise<IService[]>;
  update(serviceId: string, data: Partial<IService>): Promise<IService>;
  delete(serviceId: string): Promise<void>;

  getAllFeatures(): Promise<IFeature[]>;
  createFeature(name: string, uniqueId: string): Promise<IFeature>;
  upsertServiceFeature(data: IUpsertServiceFeatureInput): Promise<IServiceFeature>;
  deleteServiceFeature(serviceId: string, featureId: string): Promise<void>;
  upsertPricingConfig(serviceId: string, data: IPricingConfigInput): Promise<IServicePricingConfig>;
  getServicesStats(): Promise<IServicesStats>;
}
