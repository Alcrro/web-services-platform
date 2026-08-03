import { Prisma, PrismaClient } from "@prisma/client";
import { ServiceRepository } from "../domain/service.repository.interface";
import {
  featureMapperDocToDom,
  pricingConfigDocToDom,
  serviceFeatureDoToDom,
  serviceMapperDocToDom,
  serviceMapperDomToDoc,
  servicePartialMapperDoc,
} from "./serviceMapper";
import {
  IFeature,
  IFilterServices,
  IPricingConfigInput,
  IService,
  IServiceFeature,
  IServicePricingConfig,
  IServiceStat,
  IServicesStats,
  IUpsertServiceFeatureInput,
} from "../domain/types/service.types";
import { AppError } from "@/shared/utils/AppError";
import { buildPrismaFilters } from "@/shared/utils/filters/buildPrismaFilters";
import { IFilterOption, IOrderBy } from "@/modules/globals/types/types";

export class ServiceRepositImpl implements ServiceRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(service: IService): Promise<IService> {
    const serviceMapper = serviceMapperDomToDoc(service);
    try {
      const result = await this.db.service.create({
        data: serviceMapper,
        include: {
          serviceFeatures: { include: { feature: true } },
          pricingConfig: true,
        },
      });

      return serviceMapperDocToDom(result);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError(error.message, "", error.status);
      }

      throw new Error("internal error");
    }
  }
  async findById(serviceId: string): Promise<IService | null> {
    try {
      const result = await this.db.service.findUnique({
        where: { uniqueId: serviceId },
        include: {
          serviceFeatures: { include: { feature: true } },
          pricingConfig: true,
        },
      });

      if (!result) return null;

      return serviceMapperDocToDom(result);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError(error.message, "", error.status);
      }
      throw new Error("internal error");
    }
  }
  async findAll(options?: IFilterServices): Promise<IService[]> {
    try {
      const {
        filters = {} as IFilterOption<IService>,
        limit = 15,
        skip = 0,
        orderBy = {} as IOrderBy<IService>,
      } = options || {};

      let orderByPrisma: Prisma.ServiceOrderByWithAggregationInput | undefined =
        undefined;

      if (orderBy?.field) {
        orderByPrisma = {
          [orderBy.field]: orderBy.direction || "asc",
        };
      }
      const filtersPrisma = buildPrismaFilters<IService>(filters, "services");

      const result = await this.db.service.findMany({
        where: filtersPrisma,
        ...(limit && limit > 0 ? { take: limit } : {}),
        skip,
        ...(orderByPrisma ? { orderBy: orderByPrisma } : {}),
        include: {
          serviceFeatures: { include: { feature: true } },
          pricingConfig: true,
        },
      });

      return result.map(serviceMapperDocToDom);
    } catch (error) {
      console.log(error);

      throw new Error("Internal db error");
    }
  }
  async update(
    serviceId: string,
    serviceData: Partial<IService>
  ): Promise<IService> {
    try {
      const data = servicePartialMapperDoc(serviceData);
      const result = await this.db.service.update({
        where: { id: Number(serviceId) },
        data: data,
        include: {
          serviceFeatures: { include: { feature: true } },
          pricingConfig: true,
        },
      });

      return serviceMapperDocToDom(result);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError(error.message, "", error.status);
      }
      throw new Error("internal error");
    }
  }
  async delete(serviceId: string): Promise<void> {
    try {
      await this.db.service.delete({
        where: { id: Number(serviceId) },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError(error.message, "", error.status);
      }
      throw new Error("internal error");
    }
  }

  async getAllFeatures(): Promise<IFeature[]> {
    const features = await this.db.feature.findMany({
      where: { isDeleted: false },
      orderBy: { name: "asc" },
    });
    return features.map(featureMapperDocToDom);
  }

  async createFeature(name: string, uniqueId: string): Promise<IFeature> {
    const feature = await this.db.feature.create({
      data: { name, uniqueId },
    });
    return featureMapperDocToDom(feature);
  }

  async upsertServiceFeature(data: IUpsertServiceFeatureInput): Promise<IServiceFeature> {
    const result = await this.db.serviceFeature.upsert({
      where: {
        serviceId_featureId: {
          serviceId: Number(data.serviceId),
          featureId: Number(data.featureId),
        },
      },
      create: {
        uniqueId: crypto.randomUUID(),
        serviceId: Number(data.serviceId),
        featureId: Number(data.featureId),
        type: data.type,
        hours: data.hours,
        unitPrice: new Prisma.Decimal(data.unitPrice),
        isIncluded: data.isIncluded,
        quantity: data.quantity ?? 1,
      },
      update: {
        type: data.type,
        hours: data.hours,
        unitPrice: new Prisma.Decimal(data.unitPrice),
        isIncluded: data.isIncluded,
        quantity: data.quantity ?? 1,
        isDeleted: false,
        deletedAt: null,
      },
      include: { feature: true },
    });
    return serviceFeatureDoToDom(result);
  }

  async deleteServiceFeature(serviceId: string, featureId: string): Promise<void> {
    await this.db.serviceFeature.update({
      where: {
        serviceId_featureId: {
          serviceId: Number(serviceId),
          featureId: Number(featureId),
        },
      },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async upsertPricingConfig(serviceId: string, data: IPricingConfigInput): Promise<IServicePricingConfig> {
    const result = await this.db.servicePricingConfig.upsert({
      where: { serviceId: Number(serviceId) },
      create: {
        serviceId: Number(serviceId),
        hourlyRate: new Prisma.Decimal(data.hourlyRate),
        markupRate: new Prisma.Decimal(data.markupRate),
        fixedCosts: new Prisma.Decimal(data.fixedCosts),
        taxRate: new Prisma.Decimal(data.taxRate),
        displayPrice: data.displayPrice != null ? new Prisma.Decimal(data.displayPrice) : null,
        displayModel: data.displayModel,
        currency: data.currency,
      },
      update: {
        hourlyRate: new Prisma.Decimal(data.hourlyRate),
        markupRate: new Prisma.Decimal(data.markupRate),
        fixedCosts: new Prisma.Decimal(data.fixedCosts),
        taxRate: new Prisma.Decimal(data.taxRate),
        displayPrice: data.displayPrice != null ? new Prisma.Decimal(data.displayPrice) : null,
        displayModel: data.displayModel,
        currency: data.currency,
      },
    });
    return pricingConfigDocToDom(result);
  }

  async getServicesStats(): Promise<IServicesStats> {
    const [services, totalOrders] = await Promise.all([
      this.db.service.findMany({
        where: { isDeleted: false },
        include: {
          pricingConfig: true,
          _count: {
            select: {
              orders: true,
              serviceFeatures: { where: { isDeleted: false } },
            },
          },
        },
        orderBy: { name: "asc" },
      }),
      this.db.serviceOrder.count(),
    ]);

    const stats: IServiceStat[] = services.map((s) => ({
      id: String(s.id),
      name: s.name,
      uniqueId: s.uniqueId,
      displayModel: (s.pricingConfig?.displayModel as IServicesStats["services"][number]["displayModel"]) ?? null,
      displayPrice: s.pricingConfig?.displayPrice ? Number(s.pricingConfig.displayPrice) : null,
      currency: s.pricingConfig?.currency ?? "EUR",
      orderCount: s._count.orders,
      featureCount: s._count.serviceFeatures,
      isHighlight: s.isHighlight ?? false,
      hasPricing: !!s.pricingConfig,
    }));

    return {
      totalServices: services.length,
      configuredPricing: services.filter((s) => s.pricingConfig).length,
      contactServices: services.filter((s) => s.pricingConfig?.displayModel === "CONTACT").length,
      totalOrders,
      services: stats,
    };
  }
}
