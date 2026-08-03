"use server";

import { API_URL } from "@/shared/config/env";
import { cookies } from "next/headers";

export async function getLinkedOrder() {
  try {
    const token = (await cookies()).get("accessToken")?.value ?? null;
    const result = await fetch(`${API_URL}/api/activity/check-order-linked`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
