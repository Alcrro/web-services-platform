import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/users/application/FindById.usecase";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/user.repository";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import { GetClientProjectDetailUseCase } from "@/modules/orders/application/use-cases/GetClientProjectDetail.usecase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
    const project = await new GetClientProjectDetailUseCase(orderRepo).execute(user.clientId, id);

    return NextResponse.json({ data: project });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found or access denied") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
