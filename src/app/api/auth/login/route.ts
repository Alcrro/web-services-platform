import { BcryptServices } from "@/services/bcrypt/BcryptServices";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Login } from "@/modules/auth/application/Login.usecase";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/auth.repository";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit(req, "auth");
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, password } = await req.json();
    const userAgent = req.headers.get("user-agent") || "unknown";
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";

    const bcryptServices = new BcryptServices();
    const tokenServices = new JWTTokenServices();
    const authRepoImpl = new AuthRepositoryImpl(prisma);
    const loginUseCase = new Login(authRepoImpl, bcryptServices, tokenServices);

    const login = await loginUseCase.execute(email, password, {
      userAgent,
      ipAddress,
    });

    const res = NextResponse.json(
      { success: true, message: "Logged in" },
      { status: 200 }
    );
    res.cookies.set({
      name: "accessToken",
      value: login.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or 'strict'
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day (match JWT_EXPIRES_IN)
    });
    res.cookies.set({
      name: "refreshToken",
      value: login.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or 'strict'
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days (match JWT_EXPIRES_IN)
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json("Server error", { status: 501 });
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     const bcryptServices = new BcryptServices();
//     const tokenServices = new JWTTokenServices();
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password required!" },
//         { status: 400 }
//       );
//     }
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (user?.role !== "ADMIN") {
//       return NextResponse.json(
//         { error: "You are not allowed!" },
//         { status: 400 }
//       );
//     }

//     if (!user)
//       return NextResponse.json(
//         { error: "Invalid credentials!" },
//         { status: 400 }
//       );
//     const comparePassword = bcryptServices.comparePassword(
//       password,
//       user.password
//     );

//     if (!comparePassword) {
//       return NextResponse.json(
//         { error: "Invalid credentials!" },
//         { status: 400 }
//       );
//     }

//     const token = tokenServices.generateRefreshToken(user.id);

//     const res = NextResponse.json({ message: "Logged in" }, { status: 200 });
//     res.cookies.set({
//       name: "session",
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax", // or 'strict'
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7, // 7 days (match JWT_EXPIRES_IN)
//     });
//     return res;
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     return NextResponse.json("Server error", { status: 501 });
//   }
// }
