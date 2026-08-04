"use server";
import { API_URL } from "@/shared/config/env";
import { cookies } from "next/headers";
import type { IWorkspaceProjectListItem } from "@/modules/orders/domain/types/workspace.types";

export async function fetchWorkspaceProjects(): Promise<IWorkspaceProjectListItem[]> {
  try {
    const token = (await cookies()).get("accessToken")?.value ?? null;
    const response = await fetch(`${API_URL}/api/client/workspace`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) return [];
    const json = await response.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}
