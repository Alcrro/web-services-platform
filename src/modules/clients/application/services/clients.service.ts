import { ClientAPI } from "../../infrastructure/client.api";
import { configureParams } from "@/services/api/services/servicesApi";
import { IClient, ICLientFIlters } from "../../domain/types/client.types";

export class ClientService {
  private clientAPI: ClientAPI;
  constructor(clientAPI?: ClientAPI) {
    this.clientAPI = clientAPI ?? new ClientAPI();
  }
  async getAllClients(options: ICLientFIlters) {
    const urlConfigured = configureParams<IClient>(options);

    try {
      const result = await this.clientAPI.getAllClients(urlConfigured);
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch clients: ${(error as Error).message}`);
    }
  }
}
