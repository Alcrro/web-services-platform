"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const useFilterableColumn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilter = searchParams.get("filters");

  const currentValue = searchParams.get("value");
  const setFilter = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === currentValue) {
      params.delete("filters");
      params.delete("value");
      router.push(`?${params.toString()}`);
      return;
    }
    if (currentFilter === filter && currentValue === value) {
      params.set("value", value);

      router.push(`?${params.toString()}`);

      return;
    }

    params.set("filters", filter);
    params.set("value", value);
    router.push(`?${params.toString()}`);
  };
  return { currentFilter, currentValue, setFilter };
};
