import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { ServiceOrderStatus } from "@prisma/client";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  serviceSlug: z.string().min(1),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, phone, serviceSlug, message } = parsed.data;

  const service = await prisma.service.findFirst({
    where: { slug: serviceSlug },
    include: {
      pricingConfig: true,
      serviceFeatures: {
        where: { type: "STANDARD", isDeleted: false },
        include: { feature: true },
      },
    },
  });
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const client = await prisma.client.upsert({
    where: { email },
    create: { name, email, phone: phone ?? null },
    update: { name, phone: phone ?? undefined },
  });

  const order = await prisma.serviceOrder.create({
    data: {
      projectName: `${service.name} — inquiry`,
      serviceId: service.id,
      clientId: client.id,
      status: ServiceOrderStatus.PENDING_REVIEW,
      initialPrice: service.pricingConfig?.displayPrice ?? 0,
      totalPrice: service.pricingConfig?.displayPrice ?? 0,
      requirements: message,
    },
  });

  if (service.serviceFeatures.length > 0) {
    await prisma.serviceOrderItem.createMany({
      data: service.serviceFeatures.map((sf) => ({
        orderId: order.id,
        name: sf.feature.name,
        description: sf.feature.description ?? "",
        type: "STANDARD",
        unitPrice: 0,
        totalPrice: 0,
        quantity: sf.quantity ?? 1,
        showPrice: false,
      })),
    });
  }

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
