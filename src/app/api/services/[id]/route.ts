import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { FindById } from "@/modules/services/application/usecases/FindById.usecase";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const serviceReposImpl = new ServiceRepositImpl(prisma);
    const findByIdUsecase = new FindById(serviceReposImpl);

    const result = await findByIdUsecase.execute(id);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json("Internal api error");
  }
}
