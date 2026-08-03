import {
  IClient,
  ICLientFIlters,
} from "@/modules/clients/domain/types/client.types";
import { IMetaPagination } from "@/modules/globals/types/types";
import { API_URL } from "@/shared/config/env";

export async function getClientsAPI(
  options?: ICLientFIlters
): Promise<{ data: IClient[]; meta: IMetaPagination }> {
  try {
    const url = new URL(`${API_URL}/api/clients`);
    if (options) {
      if (options.page) url.searchParams.append("page", String(options.page));
      if (options.limit)
        url.searchParams.append("limit", String(options.limit));
      if (options.skip) url.searchParams.append("skip", String(options.skip));
      if (options.filters && typeof options.filters === "object") {
        for (const [key, value] of Object.entries(options.filters)) {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        }
      }
    }
    const result = await fetch(`${url}`.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);

    throw new Error("internal error");
  }
}

export async function addClientApi(data: Partial<IClient>) {
  try {
    const result = await fetch(`${API_URL}/api/clients`, {
      method: "POST",

      body: JSON.stringify(data), // trimitem direct obiectul
      headers: { "Content-Type": "application/json" }, // important!
    });

    if (!result.ok) {
      const err = await result.json();
      throw new Error(err.error || "Failed to add client");
    }

    return await result.json();
  } catch (error) {
    console.log(error);
  }
}
