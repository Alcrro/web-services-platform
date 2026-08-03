import { JWTTokenServices } from "@/services/token/JWTToken";
import { NextRequest, NextResponse } from "next/server";
import { AuthAPI } from "@/modules/auth/infrastructure/auth.api";

/**
 * refreshAccess - checks the refresh token and issues a new access token.
 * If the refresh token is missing or expired, redirects the user to /auth/login.
 * If successful, sets a new accessToken cookie and returns a NextResponse.
 */
export async function refreshAccess(req: NextRequest) {
  try {
    //? CLone the current request URL to modify for redirects if needed
    const url = req.nextUrl.clone();
    //? Retrive  the refresh token from cookies
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const jwtServices = new JWTTokenServices();

    //? if there is no refresh token, reirect to login
    if (!refreshToken) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    //? Verify the refresh token
    const isRefTokenValid = jwtServices.verifyToken(refreshToken);

    //? verifify the refresh token is expired,redirect to login
    if (isRefTokenValid.status === "expired") {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    //? call auth api to generate a new access token using the refresh token
    const authApi = new AuthAPI();
    const accessToken = await authApi.refreshAccess(refreshToken);
    console.log({ accessToken });

    // ? build the response and set the new access token in a secure cookie
    const response = NextResponse.next();
    response.cookies.set({
      name: "accessToken",
      value: accessToken.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    return response;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Internal error");
  }
}
