import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import ServiceFeaturesList from "./ServiceFeaturesList";

const ServicesList = ({ features = [] }: { features: IServiceFeature[] }) => {
  const includedFeatures = features.filter((f) => f.type === "STANDARD");
  const extraFeatures = features.filter((f) => f.type !== "STANDARD");

  return (
    <div>
      <ServiceFeaturesList features={includedFeatures} variant="included" />

      {extraFeatures.length > 0 && (
        <>
          <div className="flex items-center gap-2 mt-5 mb-2">
            <span className="h-px flex-1 bg-(--color-border)" />
            <span className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-wider">
              Add-ons
            </span>
            <span className="h-px flex-1 bg-(--color-border)" />
          </div>
          <div className="max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <ServiceFeaturesList features={extraFeatures} variant="addon" />
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesList;
