import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { CreateOrder } from "@/modules/orders/application/use-cases/createOrder.usecase";
import { FindAllOrderWithParams } from "@/modules/orders/application/use-cases/findAllOrderWithParams.usecase";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import { AppError } from "@/shared/utils/AppError";
import { prisma } from "@/lib/prisma";
import { clientMapPrismaError } from "@/shared/utils/mappingErrors/clientMapPrismaError";
import { NextRequest, NextResponse } from "next/server";
import { ServiceOrderItemImpl } from "@/modules/orders/infrastructure/ServiceOrderItem.repository";
import { IOrdersQueryParams } from "@/modules/orders/domain/types/order.types";
import { TaskRepositoryImpl } from "@/modules/tasks/infrastructure/task.repository";
import { GithubServices } from "@/modules/features/github/application/usecase/GithubServices";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams;
    const direction = q.get("direction");

    const params: IOrdersQueryParams = {
      page: Number(q.get("page") || 1),
      limit: Number(q.get("limit") || 10),
      orderby: q.get("orderby") ?? undefined,
      direction:
        direction === "asc" || direction === "desc" ? direction : undefined,
      status: q.get("status") ?? undefined,
      service: q.get("service") ?? undefined,
      search: q.get("search") ?? undefined,
      dateFrom: q.get("dateFrom") ?? undefined,
      dateTo: q.get("dateTo") ?? undefined,
    };

    const orderRepositoryImpl = new OrderRepositoryImplementation(prisma);
    const useCase = new FindAllOrderWithParams(orderRepositoryImpl);
    const result = await useCase.execute(params);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      const appError =
        error instanceof AppError ? error : clientMapPrismaError(error);
      return NextResponse.json(
        { ok: false, message: appError.userMessage },
        { status: appError.status }
      );
    }
    return NextResponse.json("internal error");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const db = new PrismaClient();
    const { client } = body;

    console.log({ client });

    if (!client?.name || client.name === "" || !client?.email) {
      return NextResponse.json(
        { ok: false, message: "Client name and email are required" },
        { status: 400 }
      );
    }
    const TOKEN = process.env.GITHUB_TOKEN as string;
    const OWNER = process.env.GITHUB_OWNER as string;
    const REPO = process.env.GITHUB_REPO as string;
    const orderRepositoryImpl = new OrderRepositoryImplementation(prisma);
    const clientRepositoryImpl = new ClientRepositoryImpl(prisma);
    const serviceOrderItemImpl = new ServiceOrderItemImpl(prisma);
    const taskOrderItemImpl = new TaskRepositoryImpl(prisma);
    const githubServices = new GithubServices(TOKEN, OWNER, REPO);

    const createOrder = new CreateOrder(
      orderRepositoryImpl,
      clientRepositoryImpl,
      serviceOrderItemImpl,
      githubServices,
      taskOrderItemImpl
    );

    const newOrder = await createOrder.execute(body);

    return NextResponse.json({ ok: true, newOrder }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      const appError =
        error instanceof AppError ? error : clientMapPrismaError(error);

      return NextResponse.json(
        { ok: false, message: appError.userMessage },
        { status: appError.status }
      );
    }

    return NextResponse.json("internal error");
  }
}
