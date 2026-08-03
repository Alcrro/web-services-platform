import ServiceHeader from "@/components/molecules/service/servicesConifigurator/ServiceHeader";
import { IService } from "@/modules/services/domain/types/service.types";
import ServiceConfiguratorSidebar from "./ServiceConfiguratorSidebar";
import AppFooter from "./AppFooter";

import ServiceConfigurator from "./ServiceConfigurator";

// ---------------------- Main Component ----------------------
export default function SeniorWebServiceConfigurator({
  params,
  services,
}: {
  params: string[];
  services: IService;
}) {
  return (
    <div className="mx-auto p-3">
      <ServiceHeader />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <ServiceConfigurator params={params} services={services} />
        </section>

        <ServiceConfiguratorSidebar services={services} />
      </main>
      <AppFooter />
    </div>
  );
}
