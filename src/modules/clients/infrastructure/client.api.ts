import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import { IClient } from "../domain/types/client.types";
import { IMetaPagination } from "@/modules/globals/types/types";

export class ClientAPI extends BaseAPI {
  protected BASE_PATH = "/api/clients";

  async getAllClients(
    param: string
  ): Promise<{ data: IClient[]; metadata: IMetaPagination }> {
    return this.request(`${param}`, {
      method: "GET",
    });
  }
}
