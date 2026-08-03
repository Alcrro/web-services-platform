import { IFilterOption } from "@/modules/globals/types/types";
import { StatusFilter } from "./common/StatusFIlter";
import { TaskStatusFilter } from "@/modules/tasks/application/dto/task.ui.types";

export class TaskFilter<T> {
  private handlers;
  constructor() {
    this.handlers = [new StatusFilter<T>(TaskStatusFilter)];
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
