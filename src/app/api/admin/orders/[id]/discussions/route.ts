import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { generateDiscussionSummary } from "@/lib/anthropic";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id: orderId } = await params;

  const order = await prisma.serviceOrder.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const discussions = await prisma.orderDiscussion.findMany({
    where: { orderId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        where: { isDeleted: false },
        select: { id: true, name: true, type: true, unitPrice: true, quantity: true, showPrice: true },
      },
    },
  });

  return NextResponse.json(discussions);
}

const createSchema = z.object({
  notes: z.string().max(5000).default(""),
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

  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const discussion = await prisma.orderDiscussion.create({
    data: {
      orderId,
      notes: parsed.data.notes,
      status: "DRAFT",
    },
  });

  const summary = await generateDiscussionSummary(parsed.data.notes);
  if (summary) {
    await prisma.orderDiscussion.update({
      where: { id: discussion.id },
      data: { summary },
    });
  }

  return NextResponse.json({ ...discussion, summary: summary ?? null }, { status: 201 });
}
