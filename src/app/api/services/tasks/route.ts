import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { ITask } from "@/modules/tasks/domain/types/task.types";
import { TaskRepositoryImpl } from "@/modules/tasks/infrastructure/task.repository";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/user.repository";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindTasksByOrder } from "@/modules/tasks/application/use-cases/FindTasksByOrder";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams;
    // console.log({ search });

    // Pagination
    const page = Number(search.get("page")) || 1;
    const limit = Number(search.get("limit")) || 10;

    // Sorting
    const field = search.get("field") as keyof ITask;
    const direction = search.get("direction") as "asc" | "desc";

    // Filtering
    const filter = search.get("filter") as keyof ITask;
    const value = search.get("value") as string;

    // Auth
    const token =
      (await getSession()) ||
      req.headers.get("authorization")?.split(" ")[1]?.trim();

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const jwtTokenServices = new JWTTokenServices();
    const { userId } = jwtTokenServices.decodeToken(token);

    const tasksRepo = new TaskRepositoryImpl(prisma);
    const userRepo = new UserRepositoryImpl(prisma);
    const clientRepo = new ClientRepositoryImpl(prisma);
    const findTasksByOrderUseCase = new FindTasksByOrder(
      tasksRepo,
      userRepo,
      clientRepo
    );
    const { data, meta } = await findTasksByOrderUseCase.execute(userId, {
      limit,
      page,
      orderBy: { field, direction },
      filters: {
        filter,
        value,
      },
    });

    return NextResponse.json({ data, meta });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
