import { IFilterOption } from "@/modules/globals/types/types";
import { BaseFilter } from "./BaseFilter";
import { serviceNameHeaderColumnMapper } from "@/modules/services/domain/types/service.types";

export class ServiceFilter<T> extends BaseFilter<T, Record<string, unknown>> {
  private serviceNameFilterMapper = serviceNameHeaderColumnMapper as Record<
    string,
    string
  >;

  apply(filter: IFilterOption<T>): Record<string, unknown> | null {
    if (!this.isValid(filter)) return null;
    if (filter.filter !== "serviceName" || typeof filter.value !== "string")
      return null;

    console.log("filter.value:", filter.value); // <-- check the incoming key
    const mapped = this.serviceNameFilterMapper[filter.value];
    console.log("mapped value:", mapped); // <-- check what mapper returns

    return mapped ? { service: { name: mapped } } : {};
  }
}
