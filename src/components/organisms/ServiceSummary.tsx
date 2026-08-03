import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { IService } from "@/modules/services/domain/types/service.types";
import { calculatePrice } from "@/shared/utils/serviceConfigurationHelper";

const ServiceSummary = ({ service }: { service: IService }) => {
  const selectedOptions = useServiceConfiguratorStore((s) => s.selectedOptions);
  const quantity = useServiceConfiguratorStore((s) => s.quantity);
  const contactInfo = useServiceConfiguratorStore((s) => s.contactInfo);
  const price = calculatePrice(service, selectedOptions, quantity);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Summary</h2>
      <div className="p-4 border rounded space-y-3">
        <div>
          <strong>Contact:</strong> {contactInfo.name}, {contactInfo.email}
          {contactInfo.phone ? `, ${contactInfo.phone}` : ""}
        </div>
        <div>
          <strong>Service:</strong> {service.name}
        </div>
        <div>
          <strong>Base Price:</strong> ${price.base}
        </div>
        <div>
          <strong>Options:</strong> ${price.optionsPrice}
        </div>
        <div>
          <strong>Discount:</strong> ${Math.round(price.discount)}
        </div>
        <div className="font-bold">
          <strong>Total x{quantity}:</strong> ${price.total}
        </div>
      </div>
    </div>
  );
};

export default ServiceSummary;
