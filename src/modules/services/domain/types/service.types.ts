import { IFilters } from "@/modules/globals/types/types.ts";
import { websiteEstimates } from "../../../../shared/data/consts/cardServices/ServicesPrices.ts";
import {
  IServiceOrderItem,
  IStatusMapperType,
} from "@/modules/orders/domain/types/order.types.ts";

export type IPriceDisplayModel = "ONE_TIME" | "SUBSCRIPTION" | "CONTACT";

export interface IServicePricingConfig {
  id: string;
  serviceId: string;
  hourlyRate: number;
  markupRate: number;
  fixedCosts: number;
  taxRate: number;
  displayPrice: number | null;
  displayModel: IPriceDisplayModel;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IService {
  id: string;
  uniqueId: IPackageName;
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  serviceFeatures: IServiceFeature[];
  pricingConfig?: IServicePricingConfig | null;
  isDeleted: boolean | false;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isHighlight?: boolean;
}

export interface IServiceFeature {
  id: string;
  uniqueId: string;
  name?: string;
  description?: string;
  hours: number;
  serviceId: string;
  featureId: string;
  type: IFeatureType;
  unitPrice: number;

  quantity: number;
  icon?: string;
  isIncluded: boolean;
  isDeleted?: boolean | false;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  feature?: IFeature;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const featureType = {
  STANDARD: "STANDARD",
  OPTIONAL: "OPTIONAL",
  OTHER: "OTHER",
} as const;
export type IFeatureType = (typeof featureType)[keyof typeof featureType];

export interface IFeature {
  id: string;
  uniqueId: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  serviceFeatures?: IServiceFeature;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean | false;
}

export type IPackageName = (typeof websiteEstimates)[number]["id"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const extraF = websiteEstimates.flatMap((feat) => [
  ...feat.features,
  ...feat.extraFeatures,
]);

export type IExtraPackageName = (typeof extraF)[number]["id"];
export const serviceNames: (IPackageName | "other")[] = [
  "starter-website",
  "professional-website",
  "e-commerce-website",
  "premium-custom-website",
  "crm-application",
  "automation-scripts",
  "other",
] as const;

export const ServiceOrderStatus = {
  NEW: "new",
  IN_DISCUSSION: "in_discussion",
  APPROVED: "approved",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type IServiceOrderStatusType =
  (typeof ServiceOrderStatus)[keyof typeof ServiceOrderStatus];

export type WebsitePackage = {
  id: string;
  name: IPackageName;
  slug: string;
  features: WebPackFeature[];
  extraFeatures?: WebPackFeature[];
  fixedCosts?: number; // cheltuieli fixe suplimentare
  profitMargin?: number;
}; // multiplicator pentru preț final ;

export type WebPackFeature = { id: string; name: string; hours: number };

export interface IUpsertServiceFeatureInput {
  serviceId: string;
  featureId: string;
  type: IFeatureType;
  hours: number;
  unitPrice: number;
  isIncluded: boolean;
  quantity?: number;
}

export interface IPricingConfigInput {
  hourlyRate: number;
  markupRate: number;
  fixedCosts: number;
  taxRate: number;
  displayPrice?: number | null;
  displayModel: IPriceDisplayModel;
  currency: string;
}

export type IFilterServices = IFilters<IService>;

export const serviceNameHeaderColumnMapper = {
  "starter-website": "Starter Website",
  "professional-website": "Professional Website",
  "e-commerce-website": "E-commerce Website",
  "premium-custom-website": "Premium Custom Website",
  "crm-application": "CRM Application",
  "automation-scripts": "Automation & Scripts",
} as const;

export interface IServiceStat {
  id: string;
  name: string;
  uniqueId: string;
  displayModel: IPriceDisplayModel | null;
  displayPrice: number | null;
  currency: string;
  orderCount: number;
  featureCount: number;
  isHighlight: boolean;
  hasPricing: boolean;
}

export interface IServicesStats {
  totalServices: number;
  configuredPricing: number;
  contactServices: number;
  totalOrders: number;
  services: IServiceStat[];
}

export interface IServiceOrderTable {
  id: string;
  orderNo: number;
  projectName: string;
  serviceName?: string;
  clientName?: string;
  service?: IService;
  uniqueServiceId?: string;
  status: IStatusMapperType;
  initialPrice: number;
  totalPrice: number;
  includedFeatures: { name: string }[];
  extraFeatures: { name: string }[];
  requirements: string;
  items?: IServiceOrderItem[];
  createdAt: string;
  extraFeaturesTotalPrice: number;
}
