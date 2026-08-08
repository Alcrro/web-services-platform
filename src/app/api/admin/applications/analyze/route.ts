import { NextRequest, NextResponse } from "next/server";
import { AnalyzeInputSchema } from "@/modules/prospecting/application/validators/application.validators";
import { AnalyzeApplication } from "@/modules/prospecting/application/use-case/AnalyzeApplication.usecase";
import { requireAuth } from "@/lib/requireAuth";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const rl = await checkRateLimit(req, "ai");
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = AnalyzeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const useCase = new AnalyzeApplication();
    const result = await useCase.execute(parsed.data.jobDescription, parsed.data.metadata);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "AI unavailable" }, { status: 503 });
  }
}
