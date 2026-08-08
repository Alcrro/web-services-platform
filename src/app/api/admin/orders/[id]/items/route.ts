import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

const schema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  type: z.enum(["STANDARD", "OPTIONAL", "OTHER"]),
  unitPrice: z.number().min(0).default(0),
  quantity: z.number().int().min(1).default(1),
  showPrice: z.boolean().default(true),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id: orderId } = await params;

  const order = await prisma.serviceOrder.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid item data" }, { status: 400 });

  const { name, description, type, unitPrice, quantity, showPrice } = parsed.data;

  const item = await prisma.serviceOrderItem.create({
    data: {
      orderId,
      name,
      description: description ?? "",
      type,
      unitPrice,
      totalPrice: unitPrice * quantity,
      quantity,
      showPrice,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
