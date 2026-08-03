import type {
  IFeatureType,
  IPackageName,
  IServiceFeature,
} from "../types/service.types.ts";

export interface FeatureCost {
  id: string;
  name: string;
  hours: number;
  rate: number; // unit price per hour (adjusted)
  price: number; // total price for feature
  type: IFeatureType;
}

export interface PricingOptions {
  id: string;
  serviceId: IPackageName;
  taxRate: number; // e.g. 0.19
  profitMargin: number; // e.g. 2.2
  fixedCosts?: number; // optional
}

export interface ServiceBreakdown {
  features: FeatureCost[];
  fixedCosts: number;
  standardInitial: number;
  profitApplied: number;
  totalWithoutTax: number;
  breakdownByType: {
    standardTotal: number;
    optionalTotal: number;
    otherTotal: number;
  };
}

export class ServicePrice {
  constructor() {}

  // Ajustează tariful în funcție de tip feature
  private getAdjustedRate(baseRate: number, type: IFeatureType) {
    switch (type) {
      case "OPTIONAL":
        return baseRate * 1.45; // +45%
      case "OTHER":
        return baseRate * 1.85; // +85%
      default:
        return baseRate; // STANDARD
    }
  }

  // Calculează fiecare feature individual
  private calculateFeature(
    feature: IServiceFeature,
    baseRate: number
  ): FeatureCost {
    const rateAdjusted = this.getAdjustedRate(baseRate, feature.type);
    const unitPrice = Number(rateAdjusted.toFixed(2));
    const price = Number(
      (rateAdjusted * feature.hours * feature.quantity).toFixed(2)
    );
    const name = feature.name ?? "";
    return { ...feature, name, rate: unitPrice, price };
  }

  // Calcul complet pregătit pentru DB și UI
  public calculateServiceBreakdown(
    serviceFeatures: IServiceFeature[],
    options: PricingOptions,
    hourlyRates: Record<IPackageName, number>
  ): ServiceBreakdown {
    const baseRate = hourlyRates[options.serviceId];
    const fixedCosts = options.fixedCosts ?? 0;

    // Calculează toate feature-urile
    const features: FeatureCost[] = serviceFeatures.map((f) =>
      this.calculateFeature(f, baseRate)
    );

    // Funcție utilitară pentru a suma după tip
    const sumByType = (type: IFeatureType) =>
      features
        .filter((f) => f.type === type)
        .reduce((sum, f) => sum + f.price, 0);

    const standardTotal = sumByType("STANDARD");
    const optionalTotal = sumByType("OPTIONAL");
    const otherTotal = sumByType("OTHER");

    // STANDARD + fixedCosts
    const standardInitial = standardTotal + fixedCosts;

    // Profit doar pe STANDARD + fixedCosts
    const profitApplied = Number(
      (standardInitial * options.profitMargin).toFixed(2)
    );

    // Total fără TVA
    const totalWithoutTax = Number(
      (standardInitial + profitApplied).toFixed(2)
    );

    return {
      features,
      fixedCosts,
      standardInitial,
      profitApplied,
      totalWithoutTax,
      breakdownByType: {
        standardTotal,
        optionalTotal,
        otherTotal,
      },
    };
  }
}

export type HourlyRateTypes = Record<IPackageName, number>;

export const hourlyRates: HourlyRateTypes = {
  "starter-website": 35,
  "professional-website": 45,
  "e-commerce-website": 55,
  "premium-custom-website": 0,
  "crm-application": 55,
  "automation-scripts": 60,
} as const;
