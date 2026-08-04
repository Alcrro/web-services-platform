"use server";
import { API_URL } from "@/shared/config/env";
import { cookies } from "next/headers";
import type { IWorkspaceProjectDetail } from "@/modules/orders/domain/types/workspace.types";

export async function fetchWorkspaceProjectDetail(
  id: string
): Promise<IWorkspaceProjectDetail | null> {
  try {
    const token = (await cookies()).get("accessToken")?.value ?? null;
    const response = await fetch(`${API_URL}/api/client/workspace/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const json = await response.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
