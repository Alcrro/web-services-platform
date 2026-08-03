// ActivityList.tsx
"use client";

import { API_URL } from "@/shared/config/env";
import Activity from "./Activity";
import { useQuery } from "@tanstack/react-query";

const ActivityList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["linkedOrder"],
    queryFn: async () => {
      const result = await fetch(`${API_URL}/api/activity/check-order-linked`, {
        method: "GET",
        credentials: "include",
      });

      if (!result.ok) throw new Error("Failed to fetch linked order info");
      return result.json(); // { linked: boolean }
    },
  });

  if (isLoading) return <p>Loading activity…</p>;
  if (isError) return <p>Could not load activity</p>;

  return <div>{!data.linked && <Activity />}</div>;
};

export default ActivityList;
