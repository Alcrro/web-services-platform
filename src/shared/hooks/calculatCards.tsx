import { IService } from "@/modules/services/domain/types/service.types";
import { calculatePrice } from "../utils/serviceConfigurationHelper";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";

export const useCalculateConfigurator = (services: IService) => {
  const quantity = useServiceConfiguratorStore((store) => store.quantity);

  const selectedOptions = useServiceConfiguratorStore(
    (store) => store.selectedOptions
  );
  return calculatePrice(services, selectedOptions, quantity);
};
