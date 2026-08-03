import {
  IFiltersServiceOrders,
  IOrdersQueryParams,
  IServiceOrder,
} from "../domain/types/order.types";
import { OrdersAPI } from "../infrastructure/order.api";
import { clientDetailsVerification } from "./validators/validateOrder";
import { IMetaPagination } from "@/modules/globals/types/types";
import { ordersTableMapper } from "../infrastructure/serviceOrderMapper";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import { ContactInfo } from "@/modules/auth/domain/auth.types";
import { orderInvoiceOrderDTO } from "./mapper/orderInvoice.mapper";

export class OrdersAction {
  private ordersAPI: OrdersAPI;
  constructor() {
    this.ordersAPI = new OrdersAPI();
  }

  async createOrder(order: Partial<IServiceOrder>) {
    const sanitizedData = {
      name: order.client?.name ?? "",
      email: order.client?.email ?? "",
      phone: order.client?.phone,
    };
    const validation = clientDetailsVerification(sanitizedData as ContactInfo);

    if (!validation.success) {
      // ❗ NU chema API-ul
      return validation;
    }
    const res = await this.ordersAPI.createOrder(order);

    return res;
  }

  async getAllOrder(
    options: IFiltersServiceOrders
  ): Promise<{ data: IServiceOrder[]; meta: IMetaPagination }> {
    const { data, meta } = await this.ordersAPI.findAllOrders<
      IServiceOrder & { extraFeaturesTotalPrice: number }[]
    >(options);
    return { data, meta };
  }

  async getAllTableOrders(options: IFiltersServiceOrders): Promise<{
    data: IServiceOrderTable[];
    meta: IMetaPagination;
  }> {
    const result = await this.ordersAPI.findAllOrders<
      IServiceOrder & { extraFeaturesTotalPrice: number }
    >(options);
    const resultData = result.data.map(ordersTableMapper);
    return { data: resultData, meta: result.meta };
  }

  async getAllTableOrdersWithParams(params: IOrdersQueryParams): Promise<{
    data: IServiceOrderTable[];
    meta: IMetaPagination;
  }> {
    const result = await this.ordersAPI.findAllOrdersWithParams<
      IServiceOrder & { extraFeaturesTotalPrice: number }
    >(params);
    const resultData = result.data.map(ordersTableMapper);
    return { data: resultData, meta: result.meta };
  }

  async getOneOrderInvoice(id: string) {
    const result = await this.ordersAPI.getByIdServiceOrder(id);
    const resultMapped = orderInvoiceOrderDTO(result);
    return resultMapped;
  }
}
