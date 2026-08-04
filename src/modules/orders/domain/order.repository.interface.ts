import {
  IFiltersServiceOrders,
  IOrdersQueryParams,
  IServiceOrder,
  IServiceOrderStatus,
} from "./types/order.types";
import type {
  IWorkspaceProjectDetail,
  IWorkspaceProjectListItem,
} from "./types/workspace.types";

export interface OrderRepository {
  create(order: IServiceOrder): Promise<IServiceOrder>;
  findById(orderId: string): Promise<IServiceOrder>;
  updateStatus(orderId: string, status: IServiceOrderStatus): Promise<void>;
  updatePricing(orderId: string, initialPrice: number, totalPrice: number): Promise<void>;
  getAll(
    options?: IFiltersServiceOrders
  ): Promise<{ data: IServiceOrder[]; total: number }>;
  getAllWithParams(
    params: IOrdersQueryParams
  ): Promise<{ data: IServiceOrder[]; total: number }>;
  getClientProjects(clientId: string): Promise<IWorkspaceProjectListItem[]>;
  getClientProjectDetail(
    clientId: string,
    orderId: string
  ): Promise<IWorkspaceProjectDetail | null>;
}
