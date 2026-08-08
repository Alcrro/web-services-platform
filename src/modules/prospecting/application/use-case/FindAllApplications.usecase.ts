import { ApplicationRepository } from "../../domain/application.repository.interface";
import { IApplication, IApplicationFilters } from "../../domain/application.types";

export class FindAllApplications {
  constructor(private readonly repository: ApplicationRepository) {}

  async execute(filters?: IApplicationFilters): Promise<{ data: IApplication[]; total: number }> {
    return this.repository.findAll(filters);
  }
}
