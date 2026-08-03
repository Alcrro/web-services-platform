import { FindByStatus } from "@/modules/clients/application/use-case/FindByStatus.usecase";
import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.ts";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { JwtPayload } from "jsonwebtoken";
import { IServiceOrderStatus } from "@/modules/orders/domain/types/order.types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ status: string }> }
) {
  try {
    const status = (await params).status as IServiceOrderStatus;

    const token = await getSession();

    if (!token) throw new Error("token isnt valid");
    const jwtService = new JWTTokenServices();
    const decodedToken = jwtService.decodeToken(token) as JwtPayload;

    const clientRepoImp = new ClientRepositoryImpl(prisma);
    const findByStatus = new FindByStatus(clientRepoImp);

    const ordersByStatus = await findByStatus.execute(
      decodedToken.userId,
      status
    );
    return NextResponse.json(ordersByStatus, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json("Internal error", { status: 500 });
  }
}
