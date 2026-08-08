import { PrismaClient } from "@prisma/client";
import { ApplicationRepository } from "../domain/application.repository.interface";
import { IApplication, IApplicationFilters, ApplicationStatus } from "../domain/application.types";
import { applicationMapperDocToDom } from "./application.mapper";

export class ApplicationRepositoryImpl implements ApplicationRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: IApplication): Promise<IApplication> {
    const record = await this.db.application.create({
      data: {
        platform: data.platform,
        projectName: data.projectName,
        clientName: data.clientName ?? null,
        status: data.status,
        budget: data.budget ?? null,
        currency: data.currency,
        appliedAt: data.appliedAt ?? new Date(),
        link: data.link ?? null,
        rawInput: data.rawInput ?? null,
        aiAnalysis: data.aiAnalysis ? (data.aiAnalysis as object) : undefined,
        notes: data.notes ?? null,
      },
    });
    return applicationMapperDocToDom(record);
  }

  async findAll(filters?: IApplicationFilters): Promise<{ data: IApplication[]; total: number }> {
    const { status, platform, page = 1, limit = 20 } = filters ?? {};
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
      ...(status ? { status } : {}),
      ...(platform ? { platform } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.application.findMany({
        where,
        orderBy: { appliedAt: "desc" },
        skip,
        take: limit,
      }),
      this.db.application.count({ where }),
    ]);

    return { data: data.map(applicationMapperDocToDom), total };
  }

  async findById(id: string): Promise<IApplication | null> {
    const record = await this.db.application.findUnique({ where: { id } });
    return record ? applicationMapperDocToDom(record) : null;
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<IApplication> {
    const now = new Date();
    const closedStatuses: ApplicationStatus[] = [ApplicationStatus.WON, ApplicationStatus.LOST];
    const respondedStatuses: ApplicationStatus[] = [
      ApplicationStatus.INTERVIEW,
      ApplicationStatus.WON,
      ApplicationStatus.LOST,
    ];

    const record = await this.db.application.update({
      where: { id },
      data: {
        status,
        ...(respondedStatuses.includes(status) ? { respondedAt: now } : {}),
        ...(closedStatuses.includes(status) ? { closedAt: now } : {}),
      },
    });
    return applicationMapperDocToDom(record);
  }

  async softDelete(id: string): Promise<void> {
    await this.db.application.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async getDistinctPlatforms(): Promise<string[]> {
    const results = await this.db.application.findMany({
      where: { isDeleted: false },
      select: { platform: true },
      distinct: ["platform"],
      orderBy: { platform: "asc" },
    });
    return results.map((r) => r.platform);
  }
}
