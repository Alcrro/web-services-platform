import { NextRequest, NextResponse } from "next/server";
import { generateCSP } from "./shared/utils/middlewares/csp/generateCSP";
import { applyCSP } from "./shared/utils/middlewares/csp/applyCSP";
import { refreshAccess } from "./shared/utils/middlewares/auth/refrehAccess";
import { JWTTokenServices } from "./services/token/JWTToken";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get("accessToken")?.value;
  const protectedRoutes = ["administrator", "client", "invoices"];
  const firstPathname = pathname.split("/")[1] ?? "";

  let tokenValid = false;

  if (accessToken) {
    const jwtServices = new JWTTokenServices();
    const validation = jwtServices.verifyToken(accessToken);
    tokenValid = validation.status === "valid";
  }
  try {
    let response: NextResponse;

    //? Redirect authenticated users await from /auth
    if (firstPathname === "auth" && !tokenValid) {
      url.pathname = "/client/control-panel";
      response = NextResponse.redirect(url);
    }

    //? Protected routes: refreshToken if missing/expired
    if (protectedRoutes.includes(firstPathname) && !accessToken) {
      console.log("protect: ");

      return await refreshAccess(req); //? refreshAccess must return NextResponse
    } else {
      response = NextResponse.next();
    }

    // generează CSP + nonce
    const { nonce, cspHeader } = generateCSP();

    // poți păstra nonce în header dacă vrei să-l folosești în front-end
    response.headers.set(
      "Content-Security-Policy",
      `script-src 'self' 'nonce-${nonce}'`
    );
    response.headers.set("x-nonce", nonce);
    return applyCSP(response, cspHeader);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: "something wrong!" });
  }
}
export const config = {
  matcher: [
    "/administrator/:path*",
    "/invoices/:path*",
    "/client/:path*",
    "/services/:path*",
    "/auth/:path*",
  ],
};
