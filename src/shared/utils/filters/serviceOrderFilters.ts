import { IFilterOption } from "@/modules/globals/types/types";
import { DefaultFilter } from "./common/DefaultFilter";
import { StatusFilter } from "./common/StatusFIlter";
import { StringFilter } from "./common/StringFilter";
import { ServiceFilter } from "./common/ServiceFilter";
import { statusOrderByMapperURLToBackend } from "@/modules/orders/domain/types/order.types";

export class ServiceOrderFilters<T> {
  private handlers;
  constructor() {
    this.handlers = [
      new StatusFilter<T>(statusOrderByMapperURLToBackend),
      new ServiceFilter<T>(),
      new StringFilter<T>(),
      new DefaultFilter<T>(),
    ];
  }

  build<K extends keyof T>(
    filters: (IFilterOption<T> & { filter: K }) | undefined
  ): Partial<Record<string, IFilterOption<T>["value"]>> {
    if (!filters) return {};

    for (const handler of this.handlers) {
      const result = handler.apply(filters);

      if (result)
        return result as Partial<Record<K, IFilterOption<T>["value"]>>;
    }

    return {};
  }
}
