import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/services/application/usecases/FindById.usecase";
import { ServiceRepositImpl } from "@/modules/services/infrastructure/service.repository";
import Link from "next/link";
import ServiceFeaturesManager from "./ServiceFeaturesManager";
import ServicePricingConfig from "./ServicePricingConfig";

interface Props {
  id: string;
}

const ServiceAdminDetail = async ({ id }: Props) => {
  const repo = new ServiceRepositImpl(prisma);
  const service = await new FindById(repo).execute(id);

  if (!service) {
    return (
      <div className="text-center py-20 text-(--color-text-secondary)">
        Service not found.
      </div>
    );
  }

  const activeFeatures = service.serviceFeatures.filter((f) => !f.isDeleted);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
        <Link
          href="/administrator/control-panel/services/view"
          className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
        >
          ← Services
        </Link>
        <span className="text-(--color-border)">/</span>
        <h1 className="text-2xl font-bold text-(--color-text)">{service.name}</h1>
      </div>

      <div className="border border-(--color-border) rounded-2xl p-6">
        <ServiceFeaturesManager
          serviceUniqueId={service.uniqueId}
          features={activeFeatures}
        />
      </div>

      <div className="border border-(--color-border) rounded-2xl p-6">
        <ServicePricingConfig
          serviceUniqueId={service.uniqueId}
          features={activeFeatures}
          initialConfig={service.pricingConfig}
        />
      </div>
    </div>
  );
};

export default ServiceAdminDetail;
