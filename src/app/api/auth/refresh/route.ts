import { RefreshToken } from "@/modules/auth/application/RefreshToken.usecase";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/auth.repository";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const jwtTokenService = new JWTTokenServices();

    const refreshTokenCookie =
      req.cookies.get("refreshToken")?.value ||
      req.headers.get("authorization")?.split(" ")[1].trim();
    const userAgent = req.headers.get("user-agent") || "unknown";
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";

    if (!refreshTokenCookie) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const authRepo = new AuthRepositoryImpl(prisma);
    const refreshUsecase = new RefreshToken(authRepo, jwtTokenService);

    // Execute refresh using only the refresh token
    const tokens = await refreshUsecase.execute(
      "",
      refreshTokenCookie,
      ipAddress,
      userAgent
    );

    if (!tokens) {
      return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
    }

    const { generateAccessToken, generateRefreshToken } = tokens;

    const res = NextResponse.json({ token: generateAccessToken });

    res.cookies.set({
      name: "accessToken",
      value: generateAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    res.cookies.set({
      name: "refreshToken",
      value: generateRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "internal error" },
      { status: 500 }
    );
  }
}
