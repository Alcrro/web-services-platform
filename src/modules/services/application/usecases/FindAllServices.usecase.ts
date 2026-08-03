import { Services } from "../../domain/entity/service.entity";
import { ServiceRepository } from "../../domain/service.repository.interface";
import { IFilterServices, IService } from "../../domain/types/service.types";

export class FindAllServices {
  constructor(private readonly servicesRepository: ServiceRepository) {}

  async execute(options?: IFilterServices): Promise<IService[]> {
    const servicesDTO = await this.servicesRepository.findAll(options);

    const services = servicesDTO.map((service) =>
      new Services(service).toJSON()
    );

    return services;
  }
}
