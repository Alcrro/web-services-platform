import { API_URL } from "@/shared/config/env";
import { useQuery } from "@tanstack/react-query";

export function useGetOrderByClient() {
  return useQuery({
    queryKey: ["getOrderByClient"],
    queryFn: () => fetchOrdersByClient(),
  });
}

export async function fetchOrdersByClient() {
  try {
    const response = await fetch(`${API_URL}/api/services/orders/clientId`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responsee = await response.json();

    return responsee;
  } catch (error) {
    console.log(error);

    throw new Error("internal error");
  }
}
