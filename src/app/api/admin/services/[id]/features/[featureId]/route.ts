import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/services/application/usecases/FindById.usecase";
import { RemoveServiceFeature } from "@/modules/services/application/usecases/RemoveServiceFeature.usecase";
import { UpsertServiceFeature } from "@/modules/services/application/usecases/UpsertServiceFeature.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  type: z.enum(["STANDARD", "OPTIONAL", "OTHER"]),
  hours: z.number().int().min(0),
  unitPrice: z.number().min(0),
  isIncluded: z.boolean(),
  quantity: z.number().int().min(1).optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; featureId: string }> }
) {
  try {
    const { id: uniqueId, featureId } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const repo = new ServiceRepositImpl(prisma);
    const service = await new FindById(repo).execute(uniqueId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const result = await new UpsertServiceFeature(repo).execute({
      serviceId: service.id,
      featureId,
      ...parsed.data,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; featureId: string }> }
) {
  try {
    const { id: uniqueId, featureId } = await params;

    const repo = new ServiceRepositImpl(prisma);
    const service = await new FindById(repo).execute(uniqueId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    await new RemoveServiceFeature(repo).execute(service.id, featureId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
