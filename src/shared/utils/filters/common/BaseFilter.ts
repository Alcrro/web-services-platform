import { IFilterOption } from "@/modules/globals/types/types";

export abstract class BaseFilter<
  T,
  R extends Record<string, unknown> = Record<string, string | number | boolean>
> {
  abstract apply(filter: IFilterOption<T>): R | null;

  protected isValid(filter: IFilterOption<T>): boolean {
    return !!filter && !!filter.filter && filter.value != null;
  }
}
