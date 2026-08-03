import Configurator from "./Configurator";
import { getDynamicComponent } from "@/shared/utils/getDynamicComponent";
import ClientDetails from "./ClientDetails";
import { IService } from "@/modules/services/domain/types/service.types";
import SummaryConfigurator from "../../../molecules/service/servicesConifigurator/SummaryConfigurator";

type AnyComponent = React.FC<Record<string, unknown>>;
interface ComponentMap {
  [key: string]: AnyComponent | ComponentMap;
}
const ServiceConfigurator = ({
  params,
  services,
}: {
  params: string[];
  services: IService;
}) => {
  const configuratorMapper: ComponentMap = {
    features: Configurator,
    "client-details": ClientDetails,
    summary: SummaryConfigurator,
  };

  const { component: DynamicComponent, idProp } = getDynamicComponent(
    configuratorMapper,
    params
  );

  if (!DynamicComponent) return <div>this url doesnt have component</div>;
  // Pass services ONLY to Configurator (features step)
  const stepProps = params[0] === "features" ? { services } : {};

  return (
    <div>
      <DynamicComponent
        {...(idProp ? { id: idProp } : {})}
        {...stepProps}
        {...(params[0] === "summary" ? { services } : {})}
      />
    </div>
  );
};

export default ServiceConfigurator;
