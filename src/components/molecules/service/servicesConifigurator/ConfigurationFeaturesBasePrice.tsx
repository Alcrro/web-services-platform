import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

const ConfigurationFeaturesBasePrice = ({ price }: { price: number | null | undefined }) => {
  return (
    <div className="text-sm text-slate-500">
      Base: {price != null ? formatPriceValue(price) : "Contact us for a quote"}
    </div>
  );
};

export default ConfigurationFeaturesBasePrice;
