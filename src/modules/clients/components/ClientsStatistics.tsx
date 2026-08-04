import { prisma } from "@/lib/prisma";
import { ClientRepositoryImpl } from "../infrastructure/client.repository";
import { GetClientsStats } from "../application/use-case/GetClientsStats.usecase";
import ClientsTable from "./ClientsTable";
import ServicesStatCard, {
  type StatIconName,
  type StatVariant,
} from "@/modules/services/components/admin/ServicesStatCard";

interface CardConfig {
  label: string;
  value: number | string;
  sub: string;
  iconName: StatIconName;
  variant: StatVariant;
}

const ClientsStatistics = async ({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[]>;
}) => {
  const repo = new ClientRepositoryImpl(prisma);
  const useCase = new GetClientsStats(repo);
  const stats = await useCase.execute();

  const activePct = stats.totalClients
    ? Math.round((stats.activeClients / stats.totalClients) * 100)
    : 0;

  const cards: CardConfig[] = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      sub: "Registered in the platform",
      iconName: "Package",
      variant: "indigo",
    },
    {
      label: "Active Clients",
      value: stats.activeClients,
      sub: `${activePct}% have at least one order`,
      iconName: "ShoppingCart",
      variant: "emerald",
    },
    {
      label: "No Orders Yet",
      value: stats.inactiveClients,
      sub: "Clients without any order",
      iconName: "MessageCircle",
      variant: "amber",
    },
    {
      label: "New (30 days)",
      value: stats.newLast30Days,
      sub: "Joined in the last 30 days",
      iconName: "Settings",
      variant: "blue",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      <div>
        <h1 className="text-xl font-bold text-(--color-text)">
          Clients Overview
        </h1>
        <p className="text-sm text-(--color-text-secondary) mt-0.5">
          {stats.totalOrders} total orders across {stats.totalClients} clients
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <ServicesStatCard key={card.label} {...card} />
        ))}
      </div>

      <ClientsTable searchParams={searchParams} />
    </div>
  );
};

export default ClientsStatistics;
