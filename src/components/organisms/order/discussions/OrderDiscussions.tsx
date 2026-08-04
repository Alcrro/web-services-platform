import { prisma } from "@/lib/prisma";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import OrderDiscussionsClient from "./OrderDiscussionsClient";

const OrderDiscussions = async ({ id }: { id: string }) => {
  const repo = new OrderRepositoryImplementation(prisma);
  const order = await repo.findById(id);

  const serviceWithFeatures = order.serviceId
    ? await prisma.service.findFirst({
        where: { id: Number(order.serviceId) },
        include: {
          serviceFeatures: {
            where: { isDeleted: false },
            include: { feature: true },
          },
        },
      })
    : null;

  const discussions = await prisma.orderDiscussion.findMany({
    where: { orderId: id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        where: { isDeleted: false },
        select: { id: true, name: true, type: true, unitPrice: true, quantity: true, showPrice: true },
      },
    },
    // summary is a top-level field, included automatically
  });

  const serviceFeatures = serviceWithFeatures?.serviceFeatures.map((sf) => ({
    id: sf.id.toString(),
    name: sf.feature.name,
    type: sf.type as "STANDARD" | "OPTIONAL",
    unitPrice: sf.unitPrice ? Number(sf.unitPrice) : null,
  })) ?? [];

  return (
    <OrderDiscussionsClient
      orderId={id}
      orderName={order.projectName ?? ""}
      serviceFeatures={serviceFeatures}
      initialDiscussions={discussions.map((d) => ({
        id: d.id,
        notes: d.notes,
        summary: d.summary ?? undefined,
        status: d.status as "DRAFT" | "CONFIRMED",
        createdAt: d.createdAt.toISOString(),
        items: d.items.map((i) => ({
          id: i.id,
          name: i.name,
          type: i.type as "STANDARD" | "OPTIONAL" | "OTHER",
          unitPrice: i.unitPrice ? Number(i.unitPrice) : null,
          quantity: i.quantity,
          showPrice: i.showPrice,
        })),
      }))}
    />
  );
};

export default OrderDiscussions;
