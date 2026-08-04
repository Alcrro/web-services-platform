import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";

const schema = z.object({
  initialPrice: z.number().min(0),
  totalPrice: z.number().min(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid pricing" }, { status: 400 });

  const repo = new OrderRepositoryImplementation(prisma);
  await repo.updatePricing(id, parsed.data.initialPrice, parsed.data.totalPrice);

  return NextResponse.json({ ok: true });
}
