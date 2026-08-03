import ConfiguratorModal from "./ConfiguratorModal";
import SeniorWebServiceConfigurator from "@/components/organisms/service/configurator/ServieceConfigurator";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { ServicesAction } from "@/modules/services/application/services.action";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; configurator: string[] }>;
}) => {
  const { id, configurator } = await params;

  const servicesAction = new ServicesAction();
  const service = await servicesAction.getByIdService(id);

  if (!service)
    return (
      <ConfiguratorModal>
        <div>No services found</div>
      </ConfiguratorModal>
    );
  console.log("config page ");

  return (
    <DefaultLayout>
      <SeniorWebServiceConfigurator params={configurator} services={service} />
    </DefaultLayout>
  );
};

export default page;
