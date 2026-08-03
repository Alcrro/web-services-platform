import { prisma } from "@/lib/prisma";
import { FindAllServices } from "@/modules/services/application/usecases/FindAllServices.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import Link from "next/link";

const DETAIL_BASE = "/administrator/control-panel/services/id";

const ServicesAdminTable = async () => {
  const repo = new ServiceRepositImpl(prisma);
  const services = await new FindAllServices(repo).execute();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-(--color-text)">Services</h1>
      </div>

      <div className="rounded-xl border border-(--color-border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--color-bg-section) text-(--color-text-secondary) text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Features</th>
              <th className="px-5 py-3 font-medium">Pricing</th>
              <th className="px-5 py-3 font-medium">Highlight</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border)">
            {services.map((service) => {
              const activeFeatures = service.serviceFeatures.filter(
                (f) => !f.isDeleted
              );
              const hasPricing = Boolean(service.pricingConfig);

              return (
                <tr
                  key={service.uniqueId}
                  className="bg-(--color-bg) hover:bg-(--color-bg-hover) transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-(--color-text)">
                    {service.name}
                  </td>
                  <td className="px-5 py-4 text-(--color-text-secondary)">
                    {activeFeatures.length} feature
                    {activeFeatures.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-5 py-4">
                    {hasPricing ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-(--color-success)/10 text-(--color-success)">
                        Configured
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-(--color-warning)/10 text-(--color-warning)">
                        Missing
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-(--color-text-secondary)">
                    {service.isHighlight ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`${DETAIL_BASE}/${service.uniqueId}`}
                      className="text-sm font-medium text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesAdminTable;
