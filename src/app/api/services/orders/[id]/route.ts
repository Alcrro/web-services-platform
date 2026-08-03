import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindOne } from "@/modules/orders/application/use-cases/findOne.usecase";

interface Params {
  params: Promise<{ id: string }>;
}
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) return NextResponse.json("Id is required");
    const orderRepository = new OrderRepositoryImplementation(prisma);

    const findOneOrderUseCase = new FindOne(orderRepository);

    const result = await findOneOrderUseCase.execute(id);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json("Internal server error");
  }
}
