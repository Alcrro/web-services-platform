import { IServiceOrderDTO } from "./order.dto.types";

export type IOrderInvoiceDTO = IServiceOrderDTO & {
  extraFeaturesTotal: number;
};
