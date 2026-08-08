import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/services/application/usecases/FindById.usecase";
import { UpsertServiceFeature } from "@/modules/services/application/usecases/UpsertServiceFeature.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/requireAuth";

const upsertSchema = z.object({
  featureId: z.string().optional(),
  featureName: z.string().min(1).optional(),
  type: z.enum(["STANDARD", "OPTIONAL", "OTHER"]),
  hours: z.number().int().min(0),
  unitPrice: z.number().min(0),
  isIncluded: z.boolean(),
  quantity: z.number().int().min(1).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  try {
    const { id: uniqueId } = await params;
    const body = await req.json();
    const parsed = upsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    if (!parsed.data.featureId && !parsed.data.featureName) {
      return NextResponse.json(
        { error: "featureId or featureName is required" },
        { status: 400 }
      );
    }

    const repo = new ServiceRepositImpl(prisma);
    const service = await new FindById(repo).execute(uniqueId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const result = await new UpsertServiceFeature(repo).execute({
      serviceId: service.id,
      ...parsed.data,
    });

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
