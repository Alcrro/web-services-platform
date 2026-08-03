import { prisma } from "@/lib/prisma";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // iei userId din query params (atașat de middleware)
    const tokenServices = new JWTTokenServices();

    const token = await getSession();

    if (!token) {
      return NextResponse.json({ error: "No authorized" }, { status: 400 });
    }

    const { userId } = tokenServices.decodeToken(token) as JwtPayload;

    if (userId) {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
      });

      return NextResponse.json(userData);
    }

    return NextResponse.json("User not found", { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.error();
  }
}
