import { getSession } from "../../getSession";

export async function checkIsAuth() {
  try {
    const accessToken = await getSession();

    if (accessToken) {
      return accessToken;
    } else {
      return undefined;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Internal error");
  }
}
