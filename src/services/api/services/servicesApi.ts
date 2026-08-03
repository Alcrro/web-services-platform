import { IClient } from "@/modules/clients/domain/types/client.types";
import { IFilters } from "@/modules/globals/types/types";

import {
  IService,
  IServiceFeature,
} from "@/modules/services/domain/types/service.types";
import { AppError } from "@/shared/utils/AppError";
import { API_URL } from "@/shared/config/env";

export interface IAddServiceOrder {
  client: Partial<IClient>;
  serviceId: string;
  items: Partial<IServiceFeature>[];
}

export function configureParams<T>(options?: IFilters<T>): string {
  if (!options) return "";

  const params = new URLSearchParams();

  if (options.page !== undefined && options.page !== null) {
    params.append("page", String(options.page));
  }

  if (options.limit !== undefined && options.limit !== null) {
    params.append("limit", String(options.limit));
  }

  if (options.skip !== undefined && options.skip !== null) {
    params.append("skip", String(options.skip));
  }

  if (options.orderBy) {
    params.append("field", String(options.orderBy.field));
    params.append("direction", String(options.orderBy.direction));
  }

  console.log(options.filters);

  if (options.filters && typeof options.filters === "object") {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export async function getFutureServiceById(id: string): Promise<IService> {
  const url = new URL(`${API_URL}/api/services/${id}`);

  try {
    const response = await fetch(`${url}`.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText.toString());
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("internal error");
  }
}
