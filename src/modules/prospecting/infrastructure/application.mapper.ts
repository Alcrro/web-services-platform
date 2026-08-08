import { Application } from "@prisma/client";
import { IApplication, ApplicationStatus, AnalysisResult } from "../domain/application.types";

export function applicationMapperDocToDom(doc: Application): IApplication {
  return {
    id: doc.id,
    platform: doc.platform,
    projectName: doc.projectName,
    clientName: doc.clientName ?? null,
    status: doc.status as ApplicationStatus,
    budget: doc.budget ? Number(doc.budget) : null,
    currency: doc.currency,
    appliedAt: doc.appliedAt,
    respondedAt: doc.respondedAt ?? null,
    closedAt: doc.closedAt ?? null,
    link: doc.link ?? null,
    rawInput: doc.rawInput ?? null,
    aiAnalysis: doc.aiAnalysis ? (doc.aiAnalysis as unknown as AnalysisResult) : null,
    notes: doc.notes ?? null,
    isDeleted: doc.isDeleted,
    deletedAt: doc.deletedAt ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
