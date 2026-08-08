import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApplicationRepositoryImpl } from "@/modules/prospecting/infrastructure/application.repository";
import { requireAuth } from "@/lib/requireAuth";

const SEED_PLATFORMS = ["Upwork", "Freelancer", "Direct"];

export async function GET() {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  const repo = new ApplicationRepositoryImpl(prisma);
  const fromDb = await repo.getDistinctPlatforms();

  const merged = Array.from(new Set([...SEED_PLATFORMS, ...fromDb])).sort();
  return NextResponse.json(merged);
}
