"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useSortableColumn = (field: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // read current field and direction reactively
  const currentField = searchParams.get("orderby");
  const currentDirection = searchParams.get("direction") as
    | "asc"
    | "desc"
    | null;

  // determine next direction
  const direction = useMemo(() => {
    if (currentField === field) {
      return currentDirection === "asc" ? "desc" : "asc";
    }
    return "asc"; // if changing field, start with asc
  }, [currentField, currentDirection, field]);

  // click handler
  const onClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderby", field);
    params.set("direction", direction);

    router.push(`?${params.toString()}`);
  }, [router, searchParams, field, direction]);

  return { currentField, currentDirection, direction, onClick };
};
