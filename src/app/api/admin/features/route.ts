import { prisma } from "@/lib/prisma";
import { GetAllFeatures } from "@/modules/services/application/usecases/GetAllFeatures.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createFeatureSchema = z.object({
  name: z.string().min(1),
});

export async function GET() {
  try {
    const repo = new ServiceRepositImpl(prisma);
    const useCase = new GetAllFeatures(repo);
    const features = await useCase.execute();
    return NextResponse.json(features);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createFeatureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const repo = new ServiceRepositImpl(prisma);
    const feature = await repo.createFeature(parsed.data.name, crypto.randomUUID());
    return NextResponse.json(feature, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
