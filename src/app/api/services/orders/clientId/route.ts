import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { FindAllByClient } from "./../../../../../modules/orders/application/use-cases/FindAllByClient.usecase";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/users/application/FindById.usecase";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/user.repository";

export async function GET(req: NextRequest) {
  try {
    const cookieToken = await getSession();

    let token;
    token = cookieToken;
    const reqHeader = req.headers.get("Authorization") as string;
    if (!token) {
      token = reqHeader?.replace("Bearer ", "");
    }

    const jwtTokenService = new JWTTokenServices();
    const { userId } = jwtTokenService.decodeToken(token);
    const clientRepoImpl = new ClientRepositoryImpl(prisma);
    const userRepoImpl = new UserRepositoryImpl(prisma);
    const findUserUsecase = new FindById(userRepoImpl);
    const user = await findUserUsecase.execute(userId);

    const findAllByClientUseCase = new FindAllByClient(clientRepoImpl);

    const result = await findAllByClientUseCase.execute(user.clientId!);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);

    return NextResponse.json("internal error");
  }
}
