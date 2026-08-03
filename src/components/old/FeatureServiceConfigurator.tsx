"use client";

import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import ServiceOptionRow from "../molecules/service/servicesConifigurator/ServiceOptionRow";

export const FeatureConfigurator = ({
  servicesFeatures,
}: {
  servicesFeatures: IServiceFeature[];
}) => {
  const selectedOptions = useServiceConfiguratorStore((s) => s.selectedOptions);
  const toggleOption = useServiceConfiguratorStore((s) => s.toggleOption);
  const quantity = useServiceConfiguratorStore((s) => s.quantity);
  const setQuantity = useServiceConfiguratorStore((s) => s.setQuantity);

  return (
    <div className="space-y-4">
      {servicesFeatures.map((o) => (
        <ServiceOptionRow
          key={o.id}
          option={o}
          checked={selectedOptions.some((f) => f.id === o.id).valueOf()}
          onToggle={() => toggleOption(o.id, o)}
          isIncluded={false}
        />
      ))}
      <div className="flex items-center gap-4 mt-4">
        <label className="flex items-center gap-2">
          <span className="text-sm">Copies / Instances</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 p-1 border rounded"
          />
        </label>
      </div>
    </div>
  );
};
