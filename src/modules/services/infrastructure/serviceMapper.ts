import {
  Feature,
  Prisma,
  Service,
  ServiceFeature,
  ServiceOrderItem,
  ServicePricingConfig,
} from "@prisma/client";
import {
  IFeature,
  IPackageName,
  IService,
  IServiceFeature,
  IServicePricingConfig,
} from "../domain/types/service.types";
import { IServiceOrderItem } from "@/modules/orders/domain/types/order.types";
import { JsonObject } from "@prisma/client/runtime/library";
import { toJsonValue } from "@/modules/orders/infrastructure/order.mapper";

export function serviceFeatureDoToDom(
  serviceFeatures: ServiceFeature & { feature: Feature }
): IServiceFeature {
  return {
    id: serviceFeatures.id.toString(),
    uniqueId: serviceFeatures.uniqueId,
    hours: serviceFeatures.hours,
    serviceId: serviceFeatures.serviceId.toString(),
    featureId: serviceFeatures.featureId.toString(),
    type: serviceFeatures.type || "STANDARD",
    unitPrice: serviceFeatures.unitPrice
      ? serviceFeatures.unitPrice.toNumber()
      : 0,
    quantity: serviceFeatures.quantity ?? 1,
    isIncluded: serviceFeatures.isIncluded,
    feature: featureMapperDocToDom(serviceFeatures.feature),
  };
}

export function serviceFeatureDomToDoc(
  serviceFeature: IServiceFeature
): ServiceFeature {
  return {
    id: Number(serviceFeature.id),
    uniqueId: serviceFeature.uniqueId,
    serviceId: Number(serviceFeature.serviceId),
    featureId: Number(serviceFeature.featureId),
    type: serviceFeature.type || "STANDARD",
    isIncluded: serviceFeature.isIncluded,
    hours: serviceFeature.hours,
    unitPrice: new Prisma.Decimal(serviceFeature.unitPrice),
    quantity: serviceFeature.quantity,
    isDeleted: serviceFeature.isDeleted ?? false,
    createdAt: serviceFeature.createdAt ?? new Date(),
    updatedAt: serviceFeature.updatedAt ?? new Date(),
    deletedAt: null,
  };
}

export function pricingConfigDocToDom(
  config: ServicePricingConfig
): IServicePricingConfig {
  return {
    id: config.id.toString(),
    serviceId: config.serviceId.toString(),
    hourlyRate: config.hourlyRate.toNumber(),
    markupRate: config.markupRate.toNumber(),
    fixedCosts: config.fixedCosts.toNumber(),
    taxRate: config.taxRate.toNumber(),
    displayPrice: config.displayPrice ? config.displayPrice.toNumber() : null,
    displayModel: config.displayModel,
    currency: config.currency,
    createdAt: config.createdAt,
    updatedAt: config.updatedAt,
  };
}

export function serviceMapperDocToDom(
  service: Service & {
    serviceFeatures: (ServiceFeature & { feature: Feature })[];
    pricingConfig?: ServicePricingConfig | null;
  }
): IService {
  return {
    id: service.id.toString(),
    name: service.name,
    uniqueId: service.uniqueId as IPackageName,
    isDeleted: service.isDeleted,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt ?? new Date(),
    deletedAt: service.deletedAt ?? undefined,
    slug: service.slug,
    description: service.description,
    isHighlight: service.isHighlight ?? false,
    techStack: service.techStack ?? [],
    pricingConfig: service.pricingConfig
      ? pricingConfigDocToDom(service.pricingConfig)
      : null,
    serviceFeatures: service.serviceFeatures.map(serviceFeatureDoToDom),
  };
}

export function serviceMapperDomToDoc(service: IService): Service {
  return {
    id: Number(service.id),
    name: service.name,
    uniqueId: service.uniqueId as IPackageName,
    isDeleted: service.isDeleted,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt ?? new Date(),
    deletedAt: service.deletedAt ?? null,
    slug: service.slug,
    description: service.description,
    isHighlight: service.isHighlight ?? false,
    techStack: [],
  };
}

export function servicePartialMapperDoc(
  service: Partial<IService>
): Partial<Service> {
  return {
    id: Number(service.id),
    uniqueId: service.uniqueId as IPackageName,
    name: service.name,
    slug: service.slug,
    description: service.description,
    isHighlight: service.isHighlight,
    isDeleted: service.isDeleted,
  };
}

export function featureMapperDomToDoc(feature: IFeature): Feature {
  return {
    id: Number(feature.id),
    name: feature.name,
    description: feature.description ?? "",
    uniqueId: feature.uniqueId,
    isDeleted: feature.isDeleted ?? false,
    createdAt: feature.createdAt ?? new Date(),
    updatedAt: feature.updatedAt ?? new Date(),
    deletedAt: feature.deletedAt ?? null,
  };
}
export function featureMapperDocToDom(feature: Feature): IFeature {
  return {
    id: feature.id.toString(),
    name: feature.name,
    description: feature.description ?? "",
    uniqueId: feature.uniqueId,
    isDeleted: feature.isDeleted ?? false,
    createdAt: feature.createdAt ?? new Date(),
    updatedAt: feature.updatedAt ?? new Date(),
    deletedAt: feature.deletedAt ?? undefined,
  };
}

type IServiceOrderItemProps = Omit<ServiceOrderItem, "id">;
export function serviceOrderItemMapperDomToDoc(
  item: IServiceOrderItem
): IServiceOrderItemProps & {
  id: string | undefined;
} {
  return {
    id: item.id ?? undefined,
    name: item.name,
    description: item.description ?? "no description",
    isDeleted: item.isDeleted ?? false,

    type: item.type ?? "OPTIONAL",
    unitPrice: item.unitPrice ? new Prisma.Decimal(item.unitPrice) : null,
    quantity: item.quantity,
    orderId: item.orderId,
    totalPrice: item.totalPrice ? new Prisma.Decimal(item.totalPrice) : null,
    showPrice: item.showPrice,
    metadata: item.metadata ? toJsonValue(item.metadata) : null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? new Date(),
    deletedAt: item.deletedAt ?? null,
    discussionId: null,
  };
}
export function serviceOrderItemPartialMapperDomToDoc(
  item: Partial<IServiceOrderItem>
): Partial<ServiceOrderItem> {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "no description",

    isDeleted: item.isDeleted ?? false,
    type: item.type ?? "OPTIONAL",
    unitPrice: item.unitPrice ? new Prisma.Decimal(item.unitPrice) : null,
    quantity: item.quantity,
    orderId: item.orderId,
    totalPrice: item.totalPrice ? new Prisma.Decimal(item.totalPrice) : null,
    showPrice: item.showPrice,
    metadata: item.metadata ? toJsonValue(item.metadata) : null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? new Date(),
    deletedAt: item.deletedAt ?? null,
  };
}
export function serviceOrderItemMapperDocToDom(
  item: ServiceOrderItem
): IServiceOrderItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "no description",
    isDeleted: item.isDeleted ?? false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? new Date(),
    deletedAt: item.deletedAt ?? undefined,
    type: item.type ?? "OPTIONAL",

    unitPrice: Number(item.unitPrice) ?? 0,
    quantity: item.quantity,
    orderId: item.orderId,
    totalPrice: Number(item.totalPrice) ?? 0,
    showPrice: item.showPrice,
    metadata: item.metadata as JsonObject,
  };
}
