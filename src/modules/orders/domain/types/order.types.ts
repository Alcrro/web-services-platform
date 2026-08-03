import {
  IFeatureType,
  IService,
} from "@/modules/services/domain/types/service.types.ts";
import type { IClient } from "../../../clients/domain/types/client.types.ts";
import type { ITask } from "../../../tasks/domain/types/task.types.ts";
import { IFilters } from "@/modules/globals/types/types.ts";

export interface IServiceOrder {
  id: string;
  orderNo: number;
  projectName: string | null;
  serviceId: string;
  service?: IService;
  clientId: string;
  client?: IClient;
  serviceUniqueId?: string;
  initialPrice: number;
  totalPrice: number;
  requirements?: string | null;
  status: IServiceOrderStatus;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted: boolean | false;
  items?: IServiceOrderItem[];
  tasks?: ITask[];
}

export interface IServiceOrderItem {
  id?: string;
  orderId: string;
  order?: IServiceOrder;
  name: string;
  description?: string | null;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  showPrice: boolean;
  type?: IFeatureType;
  uniqueId?: string;
  tasks?: ITask[];
  metadata?: Record<string, unknown>; // Json
  createdAt: Date;
  isDeleted?: boolean;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type IServiceOrderStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "IN_DISCUSSION"
  | "APPROVED"
  | "DONE";

export const ServiceOrderItem = {
  INCLUDED_FEATURE: "INCLUDED_FEATURE",
  EXTRA_FEATURE: "EXTRA_FEATURE",
  MAINTENANCE: "MAINTENANCE",
  BUGFIX: "BUGFIX",
  OTHER: "OTHER",
} as const;

export type IFiltersServiceOrders = IFilters<IServiceOrder>;

export interface IOrdersQueryParams {
  page?: number;
  limit?: number;
  orderby?: string;
  direction?: "asc" | "desc";
  status?: string;
  service?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const statusOrderByMapperURLToBackend: Record<
  string,
  IServiceOrderStatus
> = {
  new: "NEW",
  "in-progress": "IN_PROGRESS",
  done: "DONE",
  "in-discussion": "IN_DISCUSSION",
  approved: "APPROVED",
} as const;

export const statusOrderByMapperFrontToURL = {
  new: "new",
  "in-progress": "in progress",
  "in-discussion": "in discussion",
  approved: "approved",
  done: "done",
} as const;

export const serviceNameMapperFrontToURL = {};

export type IStatusMapperType =
  (typeof statusMapper)[keyof typeof statusMapper];
export const statusMapper = {
  NEW: "new",
  IN_PROGRESS: "in progress",
  IN_DISCUSSION: "in discussion",
  APPROVED: "approved",
  DONE: "done",
} as const;
