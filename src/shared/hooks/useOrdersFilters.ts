"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface OrdersFilters {
  status: string | null;
  service: string | null;
  search: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export function useOrdersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: OrdersFilters = {
    status: searchParams.get("status"),
    service: searchParams.get("service"),
    search: searchParams.get("search"),
    dateFrom: searchParams.get("dateFrom"),
    dateTo: searchParams.get("dateTo"),
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const setFilter = useCallback(
    (key: keyof OrdersFilters, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    (["status", "service", "search", "dateFrom", "dateTo", "page"] as const).forEach(
      (k) => params.delete(k)
    );
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  return { filters, hasActiveFilters, setFilter, clearAll };
}
