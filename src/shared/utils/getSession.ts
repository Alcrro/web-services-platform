"use server";
import { cookies } from "next/headers";

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  return token;
}
export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return null;
  return refreshToken;
}
