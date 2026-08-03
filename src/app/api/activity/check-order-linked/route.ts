import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/auth.repository";
import { CheckOrdersAreLinked } from "./../../../../modules/clients/application/use-case/CheckOrdersAreLinked.usecase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
export async function GET(req: NextRequest) {
  try {
    const cookieToken = await getSession();

    const token = cookieToken || (req.headers.get("Authorization") as string);

    if (!token) {
      return NextResponse.json("No authorized", { status: 400 });
    }

    const authRepository = new AuthRepositoryImpl(prisma);
    const checkOrdersAreLinked = new CheckOrdersAreLinked(authRepository);

    const jwtTokenService = new JWTTokenServices();
    const { userId } = jwtTokenService.decodeToken(token);
    const isLinked = await checkOrdersAreLinked.execute(userId);

    return NextResponse.json(isLinked);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json("internal error");
  }
}
