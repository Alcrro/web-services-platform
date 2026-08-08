import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApplicationRepositoryImpl } from "@/modules/prospecting/infrastructure/application.repository";
import { UpdateStatusSchema } from "@/modules/prospecting/application/validators/application.validators";
import { UpdateApplicationStatus } from "@/modules/prospecting/application/use-case/UpdateApplicationStatus.usecase";
import { requireAuth } from "@/lib/requireAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = UpdateStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const repo = new ApplicationRepositoryImpl(prisma);
    const useCase = new UpdateApplicationStatus(repo);
    const updated = await useCase.execute(id, parsed.data.status);
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof Error && err.message === "Application not found") {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
