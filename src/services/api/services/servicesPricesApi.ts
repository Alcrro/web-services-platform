import { API_URL } from "@/shared/config/env";

export async function getServicesPrice(): Promise<
  {
    name: string;
    price: number;
  }[]
> {
  try {
    const result = await fetch(`${API_URL}/api/services/prices`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = result.json();
    return data;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something have a problem");
  }
}
