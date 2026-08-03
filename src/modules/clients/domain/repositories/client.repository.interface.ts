import { IClient, ICLientFIlters, IClientsStats } from "../types/client.types";

export interface ClientRepository {
  create(client: IClient): Promise<IClient>;
  findById(clientId: string): Promise<IClient | null>;
  findByEmail(email: string): Promise<Partial<IClient> | null>;
  getAll(options?: ICLientFIlters): Promise<{ data: IClient[]; total: number }>;
  getStats(): Promise<IClientsStats>;
  update(
    clientId: string,
    client?: Partial<IClient>
  ): Promise<Partial<IClient>>;
  delete(clientId: string): Promise<Partial<IClient>>;
}
