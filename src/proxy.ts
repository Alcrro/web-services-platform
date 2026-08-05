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
    const { nonce, cspHeader } = generateCSP();

    // Forward nonce on request so Next.js injects it into its own SSR scripts
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-nonce", nonce);

    let response: NextResponse;

    //? Redirect authenticated users away from /auth
    if (firstPathname === "auth" && tokenValid) {
      url.pathname = "/client/control-panel";
      response = NextResponse.redirect(url);
    } else if (protectedRoutes.includes(firstPathname) && !accessToken) {
      return await refreshAccess(req);
    } else {
      response = NextResponse.next({
        request: { headers: requestHeaders },
      });
    }

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
