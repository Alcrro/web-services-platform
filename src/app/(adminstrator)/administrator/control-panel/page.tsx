import { prisma } from "@/lib/prisma";
import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { GetClientsStats } from "@/modules/clients/application/use-case/GetClientsStats.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import { GetServicesStats } from "@/modules/services/application/usecases/GetServicesStats.usecase";
import { OrdersAction } from "@/modules/orders/application/orders.action";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Users, Globe } from "lucide-react";
import { ReactNode } from "react";

const formatEur = (v: number) =>
  new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);

function Section({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col rounded-xl border border-(--color-border) overflow-hidden bg-(--color-bg)"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border)">
        <div className="flex items-center gap-2">
          <span className="text-(--color-accent)">{icon}</span>
          <span className="text-sm font-semibold text-(--color-text)">{title}</span>
        </div>
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-(--color-accent) font-medium hover:opacity-70 transition-opacity"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-(--color-border) last:border-0">
      <span className="text-sm text-(--color-text-secondary)">{label}</span>
      <span
        className={`text-sm font-semibold tabular-nums ${
          highlight ? "text-(--color-accent)" : "text-(--color-text)"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

const page = async () => {
  const [clientStats, serviceStats, ordersResult] = await Promise.all([
    new GetClientsStats(new ClientRepositoryImpl(prisma)).execute(),
    new GetServicesStats(new ServiceRepositImpl(prisma)).execute(),
    new OrdersAction().getAllTableOrders({}),
  ]);

  const orders = ordersResult.data;
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const avgOrderValue = orders.length
    ? Math.round(totalRevenue / orders.length)
    : 0;
  const activePct = clientStats.totalClients
    ? Math.round((clientStats.activeClients / clientStats.totalClients) * 100)
    : 0;

  return (
    <div className="w-full flex flex-col gap-6 bg-(--color-bg-section) rounded-xl py-4 px-4">
      <div>
        <h1 className="text-2xl font-bold text-(--color-text)">Dashboard</h1>
        <p className="text-sm text-(--color-text-secondary) mt-1">
          Platform overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Section
          title="Orders"
          href="/administrator/control-panel/orders/statistics"
          icon={<ShoppingCart className="w-4 h-4" />}
        >
          <Stat label="Total orders" value={orders.length} />
          <Stat label="Total revenue" value={formatEur(totalRevenue)} highlight />
          <Stat label="Avg order value" value={formatEur(avgOrderValue)} />
        </Section>

        <Section
          title="Clients"
          href="/administrator/control-panel/clients/statistics"
          icon={<Users className="w-4 h-4" />}
        >
          <Stat label="Total clients" value={clientStats.totalClients} />
          <Stat
            label="Active"
            value={`${clientStats.activeClients} (${activePct}%)`}
            highlight
          />
          <Stat label="New (last 30 days)" value={clientStats.newLast30Days} />
        </Section>

        <Section
          title="Services"
          href="/administrator/control-panel/services/statistics"
          icon={<Globe className="w-4 h-4" />}
        >
          <Stat label="Total services" value={serviceStats.totalServices} />
          <Stat label="With pricing" value={serviceStats.configuredPricing} />
          <Stat label="Total orders" value={serviceStats.totalOrders} highlight />
        </Section>
      </div>
    </div>
  );
};

export default page;
