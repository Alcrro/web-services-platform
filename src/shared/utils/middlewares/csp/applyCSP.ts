import { NextResponse } from "next/server";

export function applyCSP(response: NextResponse, cspHeader: string) {
  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}
