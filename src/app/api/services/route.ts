import { IFilterServices } from "@/modules/services/domain/types/service.types";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "@/shared/utils/AppError";
import { FindAllServices } from "@/modules/services/application/usecases/FindAllServices.usecase";

export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get("limit");
    const page = request.nextUrl.searchParams.get("page");
    const field = request.nextUrl.searchParams.get("field");
    const direction = request.nextUrl.searchParams.get("direction");
    const filter = request.nextUrl.searchParams.get("filter");
    const value = request.nextUrl.searchParams.get("value");

    const orderByObj = field
      ? { [field]: direction === "desc" ? "desc" : "asc" }
      : undefined;

    // filtersPrisma trebuie să fie un obiect cu chei reale din model Service
    const filtersObj: Record<string, string> = {};
    if (filter && value) {
      filtersObj[filter] = value;
    }
    const options: IFilterServices = {
      limit: Number(limit),
      page,
      orderBy: orderByObj,
      filters: filtersObj,
    } as unknown as IFilterServices;

    const repositoryImpl = new ServiceRepositImpl(prisma);
    const services = new FindAllServices(repositoryImpl);

    const result = await services.execute(options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something doesnt work" },
      { status: 501 }
    );
  }
}
