"use client";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import { IStatusMapperType } from "@/modules/orders/domain/types/order.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

interface ServiceOrderStatisticsInteractiveV2Props {
  orders: IServiceOrderTable[];
}

const statusStyle: Record<IStatusMapperType, string> = {
  new: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  "in progress": "text-amber-400 bg-amber-400/10 border border-amber-400/20",
  "in discussion": "text-purple-400 bg-purple-400/10 border border-purple-400/20",
  approved: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20",
  done: "text-teal-400 bg-teal-400/10 border border-teal-400/20",
};

const columns = ["#", "Project", "Service", "Client", "Date", "Status", "Total"];

const ServiceOrderStatisticsInteractiveV2 = ({
  orders,
}: ServiceOrderStatisticsInteractiveV2Props) => {
  const sum = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div
        className="rounded-xl border border-(--color-border) overflow-hidden"
        style={{
          boxShadow: "0 4px 24px -8px rgba(0,0,0,0.3)",
          background: "var(--color-bg-section)",
        }}
      >
        <div className="px-5 py-4 border-b border-(--color-border) flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--color-text)">
            Orders Breakdown
          </h2>
          <span className="text-xs text-(--color-text-secondary)">
            {orders.length} orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b border-(--color-border)"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-bg) 60%, var(--color-bg-section))",
                }}
              >
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={`px-5 py-3 text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider whitespace-nowrap ${
                      i === 0 || i === 1 ? "text-left" : "text-center"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-(--color-border) last:border-0 transition-colors hover:bg-(--color-bg-hover)"
                >
                  <td className="px-5 py-4 text-(--color-text-secondary) text-xs font-mono">
                    #{o.orderNo}
                  </td>
                  <td className="px-5 py-4 font-medium text-(--color-text) whitespace-nowrap max-w-[180px] truncate">
                    {o.projectName}
                  </td>
                  <td className="px-5 py-4 text-center text-(--color-text-secondary) whitespace-nowrap">
                    {o.serviceName ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-center text-(--color-text) whitespace-nowrap">
                    {o.clientName ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-center text-(--color-text-secondary) whitespace-nowrap text-xs">
                    {o.createdAt}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center font-semibold text-(--color-text)">
                    {formatPriceValue(o.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr
                className="border-t-2 border-(--color-border)"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-bg) 60%, var(--color-bg-section))",
                }}
              >
                <td
                  colSpan={6}
                  className="px-5 py-3 text-sm font-semibold text-(--color-text-secondary) text-right"
                >
                  Total
                </td>
                <td className="px-5 py-3 text-center text-base font-bold text-(--color-text)">
                  {formatPriceValue(sum)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrderStatisticsInteractiveV2;
