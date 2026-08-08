import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import { AnalysisResult, IApplication, IApplicationFilters, ApplicationStatus, ScrapedJobData } from "../domain/application.types";
import { AnalyzeMetadata } from "../application/validators/application.validators";

interface AnalyzeInput {
  jobDescription: string;
  platform: string;
  metadata?: AnalyzeMetadata;
}

interface CreateApplicationDTO {
  platform: string;
  projectName: string;
  clientName?: string;
  budget?: number;
  currency?: string;
  link?: string;
  notes?: string;
  rawInput?: string;
  aiAnalysis?: AnalysisResult;
}

export class ApplicationAPI extends BaseAPI {
  protected BASE_PATH = "/api/admin/applications";

  async analyze(input: AnalyzeInput): Promise<AnalysisResult> {
    return this.request("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }

  async create(dto: CreateApplicationDTO): Promise<IApplication> {
    return this.request("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  }

  async findAll(filters?: IApplicationFilters): Promise<{ data: IApplication[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status);
    if (filters?.platform) params.set("platform", filters.platform);
    if (filters?.page) params.set("page", String(filters.page));
    if (filters?.limit) params.set("limit", String(filters.limit));
    const qs = params.toString();
    return this.request(qs ? `?${qs}` : "", { method: "GET" });
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<IApplication> {
    return this.request(`/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async getPlatforms(): Promise<string[]> {
    return this.request("/platforms", { method: "GET" });
  }

  async scrape(url: string): Promise<ScrapedJobData> {
    return this.request("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  }
}
