import { ServicesAction } from "@/modules/services/application/services.action";
import Services from "@/modules/services/components/Services";

const ServicesList = async () => {
  const servicesAction = new ServicesAction();
  const services = await servicesAction.getAllServices({});

  return <Services services={services} />;
};

export default ServicesList;
