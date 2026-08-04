import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { generateDiscussionSummary } from "@/lib/anthropic";

const updateSchema = z.object({
  notes: z.string().max(5000),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; discussionId: string }> }
) {
  const { id: orderId, discussionId } = await params;

  const discussion = await prisma.orderDiscussion.findUnique({ where: { id: discussionId } });
  if (!discussion || discussion.orderId !== orderId) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  if (discussion.status === "CONFIRMED") {
    return NextResponse.json({ error: "Cannot edit a confirmed discussion" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const summary = await generateDiscussionSummary(parsed.data.notes);

  const updated = await prisma.orderDiscussion.update({
    where: { id: discussionId },
    data: {
      notes: parsed.data.notes,
      ...(summary !== null && { summary }),
    },
  });

  return NextResponse.json(updated);
}
