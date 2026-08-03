import { BaseFilter } from "./BaseFilter";
import { IFilterOption } from "@/modules/globals/types/types";

export class StatusFilter<T> extends BaseFilter<T> {
  // private statusOrderByMapperURLToBackend = statusOrderByMapperURLToBackend;
  constructor(private readonly statusMapper: Record<string, string>) {
    super();
    this.statusMapper = statusMapper;
  }
  apply(
    filter: IFilterOption<T>
  ): Record<string, IFilterOption<T>["value"]> | null {
    if (!this.isValid(filter)) return null;
    if (filter.filter !== "status" || typeof filter.value !== "string")
      return null;

    const mapped = this.statusMapper[filter.value.toLowerCase()];
    console.log({ mapped });

    return mapped ? { status: mapped } : {};
  }
}
