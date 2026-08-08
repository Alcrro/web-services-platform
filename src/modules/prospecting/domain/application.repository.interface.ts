import { IApplication, IApplicationFilters, ApplicationStatus } from "./application.types";

export interface ApplicationRepository {
  create(data: IApplication): Promise<IApplication>;
  findAll(filters?: IApplicationFilters): Promise<{ data: IApplication[]; total: number }>;
  findById(id: string): Promise<IApplication | null>;
  updateStatus(id: string, status: ApplicationStatus): Promise<IApplication>;
  softDelete(id: string): Promise<void>;
  getDistinctPlatforms(): Promise<string[]>;
}
