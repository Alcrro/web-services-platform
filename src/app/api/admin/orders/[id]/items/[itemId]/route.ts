import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
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
