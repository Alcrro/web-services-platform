import { Client, ServiceOrder } from "@prisma/client";
import { IClient } from "../domain/types/client.types";
import { serviceOrderMapperDocToDom } from "@/modules/orders/infrastructure/serviceOrderMapper";

export function clientMapperDocToDom(
  client: Client & { orders?: ServiceOrder[] }
): IClient {
  return {
    id: client.id as string,
    name: client.name,
    email: client.email,
    phone: client.phone || "",
    isDeleted: false,
    createdAt: new Date(client.createdAt || new Date()) || undefined,
    deletedAt: client.deletedAt ?? undefined,
    updatedAt: new Date(client.updatedAt!) || undefined,
    orders: client?.orders?.map(serviceOrderMapperDocToDom) ?? undefined,
  };
}
export function clientMapperDomToDoc(client: IClient): Client {
  return {
    id: client.id as string,
    name: client.name,
    email: client.email,
    phone: client.phone || "",
    isDeleted: false,
    createdAt: new Date(client.createdAt || new Date()) || undefined,
    deletedAt: client.deletedAt ?? null,
    updatedAt: new Date(client.updatedAt!) || undefined,
  };
}
