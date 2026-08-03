"use client";

import ExportPreviewCard from "./ExportPreviewCard";
import LiveEstimateCard from "./LiveEstimateCard";
import QuickTipsSection from "../../QuickTipsCard";
import { IService } from "@/modules/services/domain/types/service.types";
import { calculatePrice } from "@/shared/utils/serviceConfigurationHelper";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import FutureConfiguratorNavButtons from "../../../molecules/FutureConfiguratorNavButtons";

const ServiceConfiguratorSidebar = ({ services }: { services: IService }) => {
  const { quantity, selectedOptions } = useServiceConfiguratorStore(
    (store) => store
  );

  const price = calculatePrice(services, selectedOptions, quantity);
  return (
    <aside className="space-y-4">
      <LiveEstimateCard price={price} />
      <FutureConfiguratorNavButtons service={services} price={price} />
      <QuickTipsSection
        title="Quick tips (senior)"
        tips={[
          "Consider phased delivery: MVP → Core features → Enhancements",
          "Document API contracts & data model early",
          "Plan for backups, observability and security from day 1",
        ]}
      />

      <ExportPreviewCard
        includedServices={services.serviceFeatures.filter(
          (filter) => filter.type === "STANDARD"
        )}
        serviceUniqueId={services.uniqueId}
        price={price.total}
      />
    </aside>
  );
};

export default ServiceConfiguratorSidebar;
