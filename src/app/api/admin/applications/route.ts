import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApplicationRepositoryImpl } from "@/modules/prospecting/infrastructure/application.repository";
import { CreateApplicationSchema } from "@/modules/prospecting/application/validators/application.validators";
import { CreateApplication } from "@/modules/prospecting/application/use-case/CreateApplication.usecase";
import { FindAllApplications } from "@/modules/prospecting/application/use-case/FindAllApplications.usecase";
import { ApplicationStatus } from "@/modules/prospecting/domain/application.types";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as ApplicationStatus | null;
  const platform = searchParams.get("platform") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);

  const repo = new ApplicationRepositoryImpl(prisma);
  const useCase = new FindAllApplications(repo);
  const result = await useCase.execute({ status: status ?? undefined, platform, page, limit });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = CreateApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const repo = new ApplicationRepositoryImpl(prisma);
  const useCase = new CreateApplication(repo);
  const application = await useCase.execute(parsed.data);

  return NextResponse.json(application, { status: 201 });
}
