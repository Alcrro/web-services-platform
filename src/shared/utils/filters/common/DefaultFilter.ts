import { IFilterOption } from "@/modules/globals/types/types";
import { BaseFilter } from "./BaseFilter";

export class DefaultFilter<T> extends BaseFilter<T> {
  apply(
    filter: IFilterOption<T>
  ): Record<string, IFilterOption<T>["value"]> | null {
    if (!this.isValid(filter)) return null;

    return { [filter.filter]: filter.value };
  }
}
