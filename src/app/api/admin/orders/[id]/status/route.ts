import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";

const schema = z.object({
  status: z.enum(["PENDING_REVIEW", "NEW", "IN_PROGRESS", "IN_DISCUSSION", "APPROVED", "DONE"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const repo = new OrderRepositoryImplementation(prisma);
  await repo.updateStatus(id, parsed.data.status);

  return NextResponse.json({ ok: true });
}
