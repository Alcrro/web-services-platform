"use server";
import { API_URL } from "@/shared/config/env";
import { cookies } from "next/headers";

export async function fetchOrdersByClient() {
  try {
    const token = (await cookies()).get("accessToken")?.value ?? null;

    const response = await fetch(`${API_URL}/api/services/orders/clientId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const orders = await response.json();

    return orders;
  } catch (error) {
    console.log(error);

    throw new Error("internal error");
  }
}
