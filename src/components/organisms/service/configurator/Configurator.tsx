import ConfigurationFeaturesBasePrice from "@/components/molecules/service/servicesConifigurator/ConfigurationFeaturesBasePrice";
import ConfigureFeaturesTitle from "@/components/molecules/service/servicesConifigurator/ConfigureFeaturesTitle";
import ServiceFeatureOptionContainer from "@/components/molecules/service/servicesConifigurator/ServiceFeatureOptionContainer";
import { IService } from "@/modules/services/domain/types/service.types";

const Configurator: React.FC<{ services?: IService }> = ({ services }) => {
  if (!services) return null; // or fallback
  const includedFeatures = services.serviceFeatures.filter(
    (f) => f.type === "STANDARD"
  );
  const extraFeatures = services.serviceFeatures.filter(
    (f) => f.type !== "STANDARD"
  );
  console.log("mere");

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ConfigureFeaturesTitle name={services.name} />
          <ConfigurationFeaturesBasePrice price={services.pricingConfig?.displayPrice ?? null} />
        </div>
        <div className="space-y-3">
          <ServiceFeatureOptionContainer
            services={includedFeatures}
            title="Features already included"
            modalName="includedFeaturesConfigurator"
            isExtra={false}
          />
        </div>

        {extraFeatures.length >= 1 && (
          <div className="space-y-3">
            <ServiceFeatureOptionContainer
              services={extraFeatures}
              title="Extra features"
              modalName="extraFeaturesConfigurator"
              isExtra={true}
            />
          </div>
        )}
        <div className="flex items-center gap-4 mt-4"></div>
      </div>
    </>
  );
};

export default Configurator;
