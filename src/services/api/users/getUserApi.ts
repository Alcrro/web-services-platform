import { API_URL } from "@/shared/config/env";
import { getSession } from "@/shared/utils/getSession";

export async function getUserApi(): Promise<{ name: string; email: string }> {
  try {
    const token = await getSession();

    const result = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Cookie: `session=${token}`,
      },
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
