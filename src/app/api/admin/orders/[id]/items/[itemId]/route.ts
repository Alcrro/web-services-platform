import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id: orderId, itemId } = await params;

  const item = await prisma.serviceOrderItem.findUnique({ where: { id: itemId } });
  if (!item || item.orderId !== orderId) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await prisma.serviceOrderItem.update({
    where: { id: itemId },
    data: { isDeleted: true, deletedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
