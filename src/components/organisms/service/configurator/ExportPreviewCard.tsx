import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

const ExportPreviewCard = ({
  includedServices,
  serviceUniqueId,
  price,
}: {
  includedServices: IServiceFeature[];
  serviceUniqueId: string;
  price: number;
}) => {
  const { selectedOptions, quantity, contactInfo } =
    useServiceConfiguratorStore((store) => store);

  const formatPrice = formatPriceValue(price);
  return (
    <div className="p-4 border rounded text-(--color-text)">
      <h4 className="font-semibold">Export preview</h4>
      <pre className="text-xs max-h-48 overflow-auto bg-(--color-bg-section) p-2 rounded-md">
        {JSON.stringify(
          {
            client: Object.entries(contactInfo).reduce<
              Record<string, string | number>
            >((acc, [key, value]) => {
              if (value) {
                acc[key] = value;
              }
              return acc;
            }, {}),
            service: serviceUniqueId,
            includedOptions: includedServices.map(
              (i, index) => `${index + 1}:${i.feature?.name}`
            ),
            selectedOptions: selectedOptions.map(
              (k, index) => `${index + 1}: ${k.feature?.name}`
            ),
            quantity,
            price: formatPrice,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default ExportPreviewCard;
