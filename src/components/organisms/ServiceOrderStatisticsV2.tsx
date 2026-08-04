import { OrdersAction } from "@/modules/orders/application/orders.action";
import ServicesStatCard, {
  type StatIconName,
  type StatVariant,
} from "@/modules/services/components/admin/ServicesStatCard";
import ServiceOrderStatisticsInteractiveV2 from "./ServiceOrderStatisticsInteractiveV2";

interface CardConfig {
  label: string;
  value: number | string;
  sub: string;
  iconName: StatIconName;
  variant: StatVariant;
}

const ServiceOrderStatisticsV2 = async () => {
  const ordersAction = new OrdersAction();
  const { data: orders } = await ordersAction.getAllTableOrders({});

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const activeServices = new Set(
    orders.map((o) => o.serviceName).filter(Boolean)
  ).size;
  const avgOrderValue = totalOrders
    ? Math.round(totalRevenue / totalOrders)
    : 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const cards: CardConfig[] = [
    {
      label: "Total Orders",
      value: totalOrders,
      sub: "All time across all services",
      iconName: "ShoppingCart",
      variant: "emerald",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      sub: "Sum of all order totals",
      iconName: "Package",
      variant: "indigo",
    },
    {
      label: "Active Services",
      value: activeServices,
      sub: "Services with at least one order",
      iconName: "Settings",
      variant: "blue",
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(avgOrderValue),
      sub: "Revenue ÷ total orders",
      iconName: "MessageCircle",
      variant: "amber",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      <div>
        <h1 className="text-xl font-bold text-(--color-text)">
          Orders Overview
        </h1>
        <p className="text-sm text-(--color-text-secondary) mt-0.5">
          Stats about all orders across your services
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <ServicesStatCard key={card.label} {...card} />
        ))}
      </div>

      <ServiceOrderStatisticsInteractiveV2 orders={orders} />
    </div>
  );
};

export default ServiceOrderStatisticsV2;
