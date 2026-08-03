import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import {
  IFiltersServiceOrders,
  IOrdersQueryParams,
  IServiceOrder,
} from "../domain/types/order.types";
import { configureParams } from "@/services/api/services/servicesApi";
import { IMetaPagination } from "@/modules/globals/types/types";

function configureOrderParams(params: IOrdersQueryParams): string {
  const p = new URLSearchParams();
  if (params.page != null) p.set("page", String(params.page));
  if (params.limit != null) p.set("limit", String(params.limit));
  if (params.orderby) p.set("orderby", params.orderby);
  if (params.direction) p.set("direction", params.direction);
  if (params.status) p.set("status", params.status);
  if (params.service) p.set("service", params.service);
  if (params.search) p.set("search", params.search);
  if (params.dateFrom) p.set("dateFrom", params.dateFrom);
  if (params.dateTo) p.set("dateTo", params.dateTo);
  const q = p.toString();
  return q ? `?${q}` : "";
}

export class OrdersAPI extends BaseAPI {
  protected BASE_PATH = "/api/services/orders";

  async createOrder(order: Partial<IServiceOrder>): Promise<Response> {
    return this.request("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...order }),
    });
  }

  async findAllOrders<T>(
    options: IFiltersServiceOrders
  ): Promise<{ data: T[]; meta: IMetaPagination }> {
    const urlConfigured = configureParams<IServiceOrder>(options);

    return this.request(`${urlConfigured}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });
  }

  async findAllOrdersWithParams<T>(
    params: IOrdersQueryParams
  ): Promise<{ data: T[]; meta: IMetaPagination }> {
    return this.request(configureOrderParams(params), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300 },
    });
  }

  async getByIdServiceOrder(
    id: string
  ): Promise<IServiceOrder & { extraFeaturesTotal: number }> {
    return this.request(`/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 86400 },
    });
  }
}
