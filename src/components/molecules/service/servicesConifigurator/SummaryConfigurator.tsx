"use client";
import ConfigureReviewTitle from "@/components/molecules/service/servicesConifigurator/ConfigureReviewTitle";
import ConfigureReviewList from "@/components/molecules/ConfigureReviewList";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { IService } from "@/modules/services/domain/types/service.types";
import { calculatePrice } from "@/shared/utils/serviceConfigurationHelper";

const SummaryConfigurator = ({ services }: { services?: IService }) => {
  const { quantity, selectedOptions } = useServiceConfiguratorStore(
    (store) => store
  );
  if (!services) return null; // or fallback

  const price = calculatePrice(services, selectedOptions, quantity);
  return (
    <>
      <div className="space-y-4">
        <ConfigureReviewTitle />
        <ConfigureReviewList serviceName={services.name} price={price} />
      </div>
    </>
  );
};

export default SummaryConfigurator;
