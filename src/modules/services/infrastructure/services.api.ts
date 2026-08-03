import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import { configureParams } from "@/services/api/services/servicesApi";
import { IFilterServices, IService } from "../domain/types/service.types";

export class ServicesAPI extends BaseAPI {
  protected BASE_PATH = "/api/services";

  async getAllServices(options: IFilterServices): Promise<IService[]> {
    const urlConfigured = configureParams<IService>(options);

    return await this.request(urlConfigured, {
      method: "GET",
      next: { revalidate: 864000 },
    });
  }

  async getOneServices(id: string): Promise<IService> {
    return await this.request(`/${id}`, {
      method: "GET",
      next: { revalidate: 864000 },
    });
  }
}
