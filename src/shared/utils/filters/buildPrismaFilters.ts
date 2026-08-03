import { IFilterOption } from "@/modules/globals/types/types";
import { ServiceOrderFilters } from "./serviceOrderFilters";
import { TaskFilter } from "./TasksFilters";

export function buildPrismaFilters<T>(
  filters: IFilterOption<T> | undefined,
  type: "serviceOrder" | "client" | "task" | "services"
) {
  if (type === "serviceOrder") {
    const filterBuilder = new ServiceOrderFilters<T>();

    return filterBuilder.build(filters);
  }
  if (type === "client") {
    return {};
  }
  if (type === "task") {
    const filterBuilder = new TaskFilter<T>();

    return filterBuilder.build(filters);
  }
  if (type === "services") {
    const filterBuilder = new ServiceOrderFilters<T>();
    return filterBuilder.build(filters);
  }

  return {};
}
