import { IClient } from "../../domain/types/client.types";
import { FindClient } from "../dto/FindClientDTO";

export function entityToFindClient(client: IClient): FindClient {
  return {
    name: client.name,
    email: client.email,
    orders: client.orders,
    createdAt: client.createdAt,
  };
}

export function entitiesToFindClients(clients: IClient[]): FindClient[] {
  return clients.map(entityToFindClient);
}
