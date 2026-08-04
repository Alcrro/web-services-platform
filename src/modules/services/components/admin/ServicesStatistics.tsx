import { prisma } from "@/lib/prisma";
import { ServiceRepositImpl } from "../../infrastructure/service.repository";
import { GetServicesStats } from "../../application/usecases/GetServicesStats.usecase";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { IPriceDisplayModel, IServiceStat } from "../../domain/types/service.types";
import ServicesStatCard, { type StatIconName, type StatVariant } from "./ServicesStatCard";

const displayModelLabel: Record<IPriceDisplayModel, string> = {
  ONE_TIME: "One-time",
  SUBSCRIPTION: "Subscription",
  CONTACT: "Custom",
};

const displayModelColor: Record<IPriceDisplayModel, string> = {
  ONE_TIME: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  SUBSCRIPTION: "text-purple-400 bg-purple-400/10 border border-purple-400/20",
  CONTACT: "text-amber-400 bg-amber-400/10 border border-amber-400/20",
};

interface CardConfig {
  label: string;
  value: number | string;
  sub: string;
  iconName: StatIconName;
  variant: StatVariant;
}

function PriceCell({ row }: { row: IServiceStat }) {
  if (!row.hasPricing)
    return <span className="text-(--color-text-secondary) text-sm">—</span>;
  if (row.displayModel === "CONTACT")
    return <span className="text-amber-400 text-sm font-medium">Custom</span>;
  if (row.displayPrice)
    return (
      <span className="text-(--color-text) text-sm font-semibold">
        {new Intl.NumberFormat("ro-RO", {
          style: "currency",
          currency: row.currency ?? "EUR",
          maximumFractionDigits: 0,
        }).format(row.displayPrice)}
      </span>
    );
  return <span className="text-(--color-text-secondary) text-sm">Calculated</span>;
}

const ServicesStatistics = async () => {
  const repo = new ServiceRepositImpl(prisma);
  const useCase = new GetServicesStats(repo);
  const stats = await useCase.execute();

  const pricingPct = stats.totalServices
    ? Math.round((stats.configuredPricing / stats.totalServices) * 100)
    : 0;

  const cards: CardConfig[] = [
    {
      label: "Total Services",
      value: stats.totalServices,
      sub: "Active packages offered",
      iconName: "Package",
      variant: "indigo",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      sub: "All time across all services",
      iconName: "ShoppingCart",
      variant: "emerald",
    },
    {
      label: "Pricing Configured",
      value: `${stats.configuredPricing} / ${stats.totalServices}`,
      sub: `${pricingPct}% of services have pricing set`,
      iconName: "Settings",
      variant: "blue",
    },
    {
      label: "Custom / Contact",
      value: stats.contactServices,
      sub: "Services without a fixed price",
      iconName: "MessageCircle",
      variant: "amber",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-(--color-text)">
          Services Overview
        </h1>
        <p className="text-sm text-(--color-text-secondary) mt-0.5">
          Stats about all services you offer
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <ServicesStatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-xl border border-(--color-border) overflow-hidden"
        style={{
          boxShadow: "0 4px 24px -8px rgba(0,0,0,0.3)",
          background: "var(--color-bg-section)",
        }}
      >
        <div className="px-5 py-4 border-b border-(--color-border) flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--color-text)">
            Per Service Breakdown
          </h2>
          <span className="text-xs text-(--color-text-secondary)">
            {stats.services.length} services
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b border-(--color-border)"
                style={{ background: "color-mix(in srgb, var(--color-bg) 60%, var(--color-bg-section))" }}
              >
                {["Service", "Model", "Price", "Orders", "Features", "Pricing", "Featured"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider whitespace-nowrap ${i === 0 ? "text-left" : "text-center"}`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {stats.services.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-(--color-border) last:border-0 transition-colors hover:bg-(--color-bg-hover)"
                >
                  <td className="px-5 py-4 font-medium text-(--color-text) whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {row.displayModel ? (
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${displayModelColor[row.displayModel]}`}
                      >
                        {displayModelLabel[row.displayModel]}
                      </span>
                    ) : (
                      <span className="text-(--color-text-secondary)">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <PriceCell row={row} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`text-base font-bold ${
                        row.orderCount > 0 ? "text-(--color-text)" : "text-(--color-text-secondary)"
                      }`}
                    >
                      {row.orderCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-(--color-text-secondary)">
                    {row.featureCount}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {row.hasPricing ? (
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="w-4.5 h-4.5 text-(--color-text-secondary) mx-auto" />
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {row.isHighlight ? (
                      <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400 mx-auto" />
                    ) : (
                      <span className="text-(--color-text-secondary)">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesStatistics;
