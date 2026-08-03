import { IFilterOption } from "@/modules/globals/types/types";
import { BaseFilter } from "./BaseFilter";

export class StringFilter<T> extends BaseFilter<
  T,
  Record<string, { contains: string; mode: string }>
> {
  private stringFields = ["projectName", "clientName", "serviceName"];
  apply(filter: IFilterOption<T>) {
    if (!this.isValid(filter)) return null;
    if (!this.stringFields.includes(String(filter.filter))) return null;

    return {
      [filter.filter]: {
        contains: filter.value.toString(),
        mode: "insensitive",
      },
    };
  }
}
