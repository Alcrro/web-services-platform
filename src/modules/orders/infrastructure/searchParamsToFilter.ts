import {
  IFilterOption,
  IFilters,
  IOrderBy,
} from "@/modules/globals/types/types";
import { IOrdersQueryParams } from "@/modules/orders/domain/types/order.types";

export function mapSearchParamsOptions<T>(
  params: Record<string, string | string[]>
): IFilters<T> {
  const page = params.page
    ? Number(Array.isArray(params.page) ? params.page[0] : params.page)
    : 1;

  const limit = params.limit
    ? Number(Array.isArray(params.limit) ? params.limit[0] : params.limit)
    : 10;

  const orderByParam = Array.isArray(params.orderby)
    ? params.orderby[0]
    : params.orderby;

  const directionParam = Array.isArray(params.direction)
    ? params.direction[0]
    : params.direction;

  const orderBy: IOrderBy<T> | undefined =
    orderByParam && typeof orderByParam === "string"
      ? {
          field: orderByParam as keyof T,
          direction:
            directionParam === "asc" || directionParam === "desc"
              ? directionParam
              : "asc",
        }
      : undefined;
  const filtersParam = Array.isArray(params.filters)
    ? params.filters[0]
    : params.filters;
  const valueParam = Array.isArray(params.value)
    ? params.value[0]
    : params.value;

  let filters: IFilterOption<T> | undefined;

  if (filtersParam && valueParam) {
    // ensure you have both
    filters = {
      filter: filtersParam as keyof T,
      value: Array.isArray(valueParam) ? valueParam.join("-") : valueParam, // e.g. "NEW" or 123
    };
  }

  return {
    limit,
    page,
    orderBy,
    filters,
  };
}

const get = (params: Record<string, string | string[]>, key: string) => {
  const v = params[key];
  return Array.isArray(v) ? v[0] : v;
};

export function mapOrdersSearchParams(
  params: Record<string, string | string[]>
): IOrdersQueryParams {
  const direction = get(params, "direction");
  return {
    page: get(params, "page") ? Number(get(params, "page")) : 1,
    limit: get(params, "limit") ? Number(get(params, "limit")) : 10,
    orderby: get(params, "orderby"),
    direction:
      direction === "asc" || direction === "desc" ? direction : undefined,
    status: get(params, "status") || undefined,
    service: get(params, "service") || undefined,
    search: get(params, "search") || undefined,
    dateFrom: get(params, "dateFrom") || undefined,
    dateTo: get(params, "dateTo") || undefined,
  };
}
