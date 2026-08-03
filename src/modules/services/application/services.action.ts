import { IFilterServices, IService } from "../domain/types/service.types";
import { ServicesAPI } from "../infrastructure/services.api";

export class ServicesAction {
  private servicesAPI: ServicesAPI;
  constructor() {
    this.servicesAPI = new ServicesAPI();
  }
  async getAllServices(options: IFilterServices): Promise<IService[]> {
    const services = await this.servicesAPI.getAllServices(options);
    return services;
  }

  async getByIdService(id: string): Promise<IService> {
    const services = await this.servicesAPI.getOneServices(id);
    return services;
  }
}
