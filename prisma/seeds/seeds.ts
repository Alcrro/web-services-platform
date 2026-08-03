import "dotenv/config";
import { prisma } from "../../src/lib/prisma.ts";
import { ServicePrice } from "../../src/modules/services/domain/entity/servicePrice.entity.ts";
import {
  allFeatures,
  serviceCosts,
} from "../../src/shared/data/consts/cardServices/featurePrices.ts";

import { servicesV11 } from "../../src/shared/data/consts/cardServices/cardServicesData.ts";
import { hourlyRates } from "../../src/modules/services/domain/entity/servicePrice.entity.ts";
import type { IFeatureType } from "../../src/modules/services/domain/types/service.types.ts";

const servicesEnt = new ServicePrice();

// displayPrice per service din datele statice (sursa de adevar pentru pretul afisat clientului)
const displayPriceMap: Record<string, number | null> = {
  "starter-website": 600,
  "professional-website": 3200,
  "e-commerce-website": 6200,
  "premium-custom-website": null,
  "crm-application": 2000,
  "automation-scripts": 1200,
};

const displayModelMap: Record<string, "ONE_TIME" | "SUBSCRIPTION" | "CONTACT"> = {
  "starter-website": "ONE_TIME",
  "professional-website": "ONE_TIME",
  "e-commerce-website": "ONE_TIME",
  "premium-custom-website": "CONTACT",
  "crm-application": "SUBSCRIPTION",
  "automation-scripts": "ONE_TIME",
};

async function main() {
  for (const service of servicesV11) {
    const prices = servicesEnt.calculateServiceBreakdown(
      service.serviceFeatures,
      serviceCosts.find((f) => f.id === service.uniqueId)!,
      hourlyRates
    );

    const cost = serviceCosts.find((f) => f.id === service.uniqueId)!;

    const createdService = await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: {
        uniqueId: service.uniqueId,
        slug: service.slug,
        name: service.name,
        description: service.description,
      },
    });

    await prisma.servicePricingConfig.upsert({
      where: { serviceId: createdService.id },
      update: {
        hourlyRate: hourlyRates[service.uniqueId as keyof typeof hourlyRates] ?? 0,
        markupRate: cost.profitMargin,
        fixedCosts: cost.fixedCosts ?? 0,
        taxRate: cost.taxRate,
        displayPrice: displayPriceMap[service.uniqueId] ?? null,
        displayModel: displayModelMap[service.uniqueId] ?? "ONE_TIME",
      },
      create: {
        serviceId: createdService.id,
        hourlyRate: hourlyRates[service.uniqueId as keyof typeof hourlyRates] ?? 0,
        markupRate: cost.profitMargin,
        fixedCosts: cost.fixedCosts ?? 0,
        taxRate: cost.taxRate,
        displayPrice: displayPriceMap[service.uniqueId] ?? null,
        displayModel: displayModelMap[service.uniqueId] ?? "ONE_TIME",
      },
    });

    for (const feature of prices.features) {
      const featureName =
        service.serviceFeatures.find((f) => f.id === feature.id)?.name ??
        feature.name; // fallback to allFeatures name

      const createdFeature = await prisma.feature.upsert({
        where: { uniqueId: feature.id },
        update: {},
        create: {
          uniqueId: feature.id,
          name: featureName,
        },
      });

      await prisma.serviceFeature.upsert({
        where: {
          serviceId_featureId: {
            serviceId: Number(createdService.id),
            featureId: Number(createdFeature.id),
          },
        },
        update: {},
        create: {
          serviceId: Number(createdService.id),
          featureId: Number(createdFeature.id),
          type: feature.type as IFeatureType,
          uniqueId: `${createdService.uniqueId}-${createdFeature.uniqueId}`,
          isIncluded: service.serviceFeatures.find(
            (f) => f.id === createdFeature.uniqueId
          )?.isIncluded,
          hours: allFeatures.find((f) => f.id === feature.id)?.hours ?? 0,
          quantity: service.serviceFeatures.find(
            (f) => f.uniqueId === feature.id
          )?.quantity,

          unitPrice: prices.features.find((f) => f.id === feature.id)?.price, // <-- use calculated price
        },
      });
    }
    console.log({ prices });
  }
  console.log("Seed -- services   added finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
