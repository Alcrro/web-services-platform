import { getSession } from "@/shared/utils/getSession";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { NextResponse } from "next/server";

export async function requireAuth(): Promise<
  { ok: true } | { ok: false; response: NextResponse }
> {
  const token = await getSession();
  if (!token) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  const tokenServices = new JWTTokenServices();
  const result = tokenServices.verifyToken(token);
  if (result.status !== "valid") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { ok: true };
}
