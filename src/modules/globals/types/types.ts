export interface IFilters<T> {
  totalPages?: number;
  filters?: IFilterOption<T>;
  orderBy?: IOrderBy<T>;
  skip?: number;
  page?: number;
  limit?: number;
  total?: number;
}

export interface IFilterOption<T> {
  filter: keyof T; // the field name to filter
  value: string | number | boolean; // value to filter by
}

export interface IOrderBy<T> {
  field: keyof T;
  direction: "asc" | "desc";
}
export interface IMetaPagination {
  total?: number;
  page?: number;
  limit?: number;
  skip?: number;
  totalPages?: number;
}
