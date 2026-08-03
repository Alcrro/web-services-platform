import { ServiceRepository } from "../../domain/service.repository.interface";

export class FindById {
  constructor(private readonly serviceReposit: ServiceRepository) {}

  async execute(serviceId: string) {
    try {
      const service = await this.serviceReposit.findById(serviceId);

      if (!service) {
        throw new Error(`Service with ${serviceId} doesn exist!`);
      }
      return service;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal getById error");
    }
  }
}
