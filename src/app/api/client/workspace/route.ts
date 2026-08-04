import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/users/application/FindById.usecase";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/user.repository";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import { GetClientProjectsUseCase } from "@/modules/orders/application/use-cases/GetClientProjects.usecase";

export async function GET(req: NextRequest) {
  try {
    const cookieToken = await getSession();
    let token = cookieToken;
    const reqHeader = req.headers.get("Authorization");
    if (!token) token = reqHeader?.replace("Bearer ", "") ?? null;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const jwtTokenService = new JWTTokenServices();
    const { userId } = jwtTokenService.decodeToken(token);

    const userRepo = new UserRepositoryImpl(prisma);
    const user = await new FindById(userRepo).execute(userId);
    if (!user.clientId) return NextResponse.json({ error: "Not a client" }, { status: 403 });

    const orderRepo = new OrderRepositoryImplementation(prisma);
    const projects = await new GetClientProjectsUseCase(orderRepo).execute(user.clientId);

    return NextResponse.json({ data: projects });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
