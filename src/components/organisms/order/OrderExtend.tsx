import { prisma } from "@/lib/prisma";
import { OrderRepositoryImplementation } from "@/modules/orders/infrastructure/order.repository";
import OrderExtendClient from "./OrderExtendClient";

const OrderExtend = async ({ id }: { id: string }) => {
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

  const serviceFeatures =
    serviceWithFeatures?.serviceFeatures.map((sf) => ({
      id: sf.id.toString(),
      name: sf.feature.name,
      type: sf.type as "STANDARD" | "OPTIONAL",
    })) ?? [];

  const items = await prisma.serviceOrderItem.findMany({
    where: { orderId: id, isDeleted: false },
    orderBy: { createdAt: "asc" },
  });

  const clientRecord = await prisma.client.findUnique({
    where: { id: order.clientId },
  });

  return (
    <OrderExtendClient
      order={{
        id: order.id,
        projectName: order.projectName ?? "",
        status: order.status,
        requirements: (order as { requirements?: string | null }).requirements ?? "",
        initialPrice: Number(order.initialPrice),
        totalPrice: Number(order.totalPrice),
        createdAt: order.createdAt.toISOString(),
        serviceName: serviceWithFeatures?.name ?? "",
      }}
      client={{
        name: clientRecord?.name ?? "",
        email: clientRecord?.email ?? "",
        phone: clientRecord?.phone ?? "",
      }}
      serviceFeatures={serviceFeatures}
      initialItems={items.map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description ?? "",
        type: i.type as "STANDARD" | "OPTIONAL" | "OTHER",
        unitPrice: Number(i.unitPrice ?? 0),
        quantity: i.quantity,
        showPrice: i.showPrice,
      }))}
    />
  );
};

export default OrderExtend;
