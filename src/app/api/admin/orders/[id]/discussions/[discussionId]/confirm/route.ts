import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

const itemSchema = z.object({
  featureId: z.string().optional(),
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  type: z.enum(["STANDARD", "OPTIONAL", "OTHER"]).default("STANDARD"),
  unitPrice: z.number().min(0).default(0),
  quantity: z.number().int().min(1).default(1),
  showPrice: z.boolean().default(false),
  action: z.enum(["ADD", "REMOVE"]).default("ADD"),
});

const confirmSchema = z.object({
  items: z.array(itemSchema),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; discussionId: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id: orderId, discussionId } = await params;

  const discussion = await prisma.orderDiscussion.findUnique({ where: { id: discussionId } });
  if (!discussion || discussion.orderId !== orderId) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  if (discussion.status === "CONFIRMED") {
    return NextResponse.json({ error: "Already confirmed" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = confirmSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid items" }, { status: 400 });

  const { items } = parsed.data;

  const toAdd = items.filter((i) => i.action === "ADD");
  const toRemove = items.filter((i) => i.action === "REMOVE");

  await prisma.$transaction(async (tx) => {
    if (toAdd.length > 0) {
      await tx.serviceOrderItem.createMany({
        data: toAdd.map((i) => ({
          orderId,
          discussionId,
          name: i.name,
          description: i.description ?? "",
          type: i.type,
          unitPrice: i.unitPrice,
          totalPrice: i.unitPrice * i.quantity,
          quantity: i.quantity,
          showPrice: i.showPrice,
        })),
      });
    }

    if (toRemove.length > 0) {
      await tx.serviceOrderItem.updateMany({
        where: {
          orderId,
          name: { in: toRemove.map((i) => i.name) },
          isDeleted: false,
        },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    }

    await tx.orderDiscussion.update({
      where: { id: discussionId },
      data: { status: "CONFIRMED" },
    });
  });

  return NextResponse.json({ ok: true });
}
