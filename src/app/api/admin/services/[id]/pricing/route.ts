import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/services/application/usecases/FindById.usecase";
import { UpsertPricingConfig } from "@/modules/services/application/usecases/UpsertPricingConfig.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/requireAuth";

const pricingSchema = z.object({
  hourlyRate: z.number().min(0),
  markupRate: z.number().min(1),
  fixedCosts: z.number().min(0),
  taxRate: z.number().min(0).max(1),
  displayPrice: z.number().min(0).nullable().optional(),
  displayModel: z.enum(["ONE_TIME", "SUBSCRIPTION", "CONTACT"]),
  currency: z.string().min(1).max(10),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  try {
    const { id: uniqueId } = await params;
    const body = await req.json();
    const parsed = pricingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const repo = new ServiceRepositImpl(prisma);
    const service = await new FindById(repo).execute(uniqueId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const result = await new UpsertPricingConfig(repo).execute(
      service.id,
      parsed.data
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
