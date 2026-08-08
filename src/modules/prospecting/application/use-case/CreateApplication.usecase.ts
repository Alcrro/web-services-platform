import { ApplicationRepository } from "../../domain/application.repository.interface";
import { IApplication, ApplicationStatus } from "../../domain/application.types";

interface CreateApplicationInput {
  platform: string;
  projectName: string;
  clientName?: string;
  budget?: number;
  currency?: string;
  link?: string;
  notes?: string;
  rawInput?: string;
  aiAnalysis?: object;
}

export class CreateApplication {
  constructor(private readonly repository: ApplicationRepository) {}

  async execute(input: CreateApplicationInput): Promise<IApplication> {
    return this.repository.create({
      platform: input.platform,
      projectName: input.projectName,
      clientName: input.clientName ?? null,
      status: ApplicationStatus.APPLIED,
      budget: input.budget ?? null,
      currency: input.currency ?? "EUR",
      link: input.link ?? null,
      notes: input.notes ?? null,
      rawInput: input.rawInput ?? null,
      aiAnalysis: input.aiAnalysis as IApplication["aiAnalysis"] ?? null,
    });
  }
}
