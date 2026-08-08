import { ApplicationRepository } from "../../domain/application.repository.interface";
import { IApplication, ApplicationStatus } from "../../domain/application.types";

export class UpdateApplicationStatus {
  constructor(private readonly repository: ApplicationRepository) {}

  async execute(id: string, status: ApplicationStatus): Promise<IApplication> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new Error("Application not found");

    return this.repository.updateStatus(id, status);
  }
}
