import { NextRequest, NextResponse } from "next/server";
import { ScrapeInputSchema } from "@/modules/prospecting/application/validators/application.validators";
import { ScrapeFreelancerJob } from "@/modules/prospecting/application/use-case/ScrapeFreelancerJob.usecase";
import { requireAuth } from "@/lib/requireAuth";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  const body = await req.json().catch(() => null);
  const parsed = ScrapeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "URL invalid" }, { status: 400 });
  }

  try {
    const useCase = new ScrapeFreelancerJob();
    const result = await useCase.execute(parsed.data.url);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scraping eșuat";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
