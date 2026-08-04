"use server";

import { API_URL } from "@/shared/config/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setLinkedOrderWithAccount(formData: FormData) {
  const token = (await cookies()).get("accessToken")?.value ?? null;

  const value = formData.get("value") as string;

  try {
    await fetch(`${API_URL}/api/activity/orders-linked`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
      credentials: "include",
    });

    revalidatePath("/dashboard");
    return { success: true, value };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "Something went wrong!",
    };
  } finally {
    revalidatePath("/dashboard");
  }
}
