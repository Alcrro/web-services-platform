import { IFilters } from "@/modules/globals/types/types";
import { IServiceOrder } from "../../../../modules/orders/domain/types/order.types";

export interface IClient {
  id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string | null;
  orders?: IServiceOrder[];
  isDeleted?: boolean | false;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IClientsStats {
  totalClients: number;
  activeClients: number;
  inactiveClients: number;
  newLast30Days: number;
  totalOrders: number;
}

export type ICLientFIlters = IFilters<IClient>;
