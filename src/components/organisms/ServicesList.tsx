import { ServicesAction } from "@/modules/services/application/services.action";
import Services from "@/modules/services/components/Services";

const ServicesList = async () => {
  const servicesAction = new ServicesAction();
  const services = await servicesAction.getAllServices({});

  const sorted = [...services].sort((a, b) => {
    const pa = a.pricingConfig?.displayPrice ?? null;
    const pb = b.pricingConfig?.displayPrice ?? null;
    if (pa === null && pb === null) return 0;
    if (pa === null) return 1;
    if (pb === null) return -1;
    return pa - pb;
  });

  return <Services services={sorted} />;
};

export default ServicesList;
