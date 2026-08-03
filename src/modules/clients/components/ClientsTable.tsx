import ClientsTableClient from "../../../components/organisms/client/ClientsTableClient";
import { IClient } from "@/modules/clients/domain/types/client.types";
import { IFilters } from "@/modules/globals/types/types";
import { ClientService } from "../application/services/clients.service";

export type IClientTable = {
  data: IClient[];
  meta: IFilters<IClient>;
};
const ClientsTable = async ({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[]>;
}) => {
  const clientsAction = new ClientService();
  const clients = await clientsAction.getAllClients(searchParams);

  const { data, metadata } = clients;

  return <ClientsTableClient data={data} meta={metadata} />;
};

export default ClientsTable;
