export enum ApplicationStatus {
  APPLIED = "APPLIED",
  INTERVIEW = "INTERVIEW",
  WON = "WON",
  LOST = "LOST",
  NO_RESPONSE = "NO_RESPONSE",
}

export interface IApplication {
  id?: string;
  platform: string;
  projectName: string;
  clientName?: string | null;
  status: ApplicationStatus;
  budget?: number | null;
  currency: string;
  appliedAt?: Date;
  respondedAt?: Date | null;
  closedAt?: Date | null;
  link?: string | null;
  rawInput?: string | null;
  aiAnalysis?: AnalysisResult | null;
  notes?: string | null;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PRDFeature {
  name: string;
  criteria: string[];
}

export interface PRDSection {
  features: PRDFeature[];
  outOfScope: string[];
  assumptions: string[];
}

export interface TechnicalAnalysis {
  canPlan: boolean;
  stack?: string[];
  architecture?: string;
  hosting?: string;
  keyDecisions?: string[];
  technicalQuestions: string[];
}

export interface JobScore {
  value: number; // 1-10
  verdict: "skip" | "consider" | "apply" | "priority";
  breakdown: {
    clientTrust: number;
    budget: number;
    competition: number;
    clarity: number;
  };
}

export interface BidStrategy {
  recommendedDays: number;
  proposalTips: string[];
  nextSteps: string[];
}

export interface AnalysisResult {
  score: JobScore;
  client: {
    name?: string;
    needs: string;
    redFlags?: string[];
  };
  theme: string;
  questions: string[];
  pitch: string;
  estimate: {
    complexity: "low" | "medium" | "high";
    budgetRange: string;
    timeEstimate: string;
  };
  prd: PRDSection;
  bid: BidStrategy;
  technical: TechnicalAnalysis;
}

export interface IApplicationFilters {
  status?: ApplicationStatus;
  platform?: string;
  page?: number;
  limit?: number;
}

export interface ScrapedJobData {
  title: string;
  description: string;
  url: string;
  budget: {
    min: number;
    max: number;
    formatted: string;
    currency: string;
    currencySign: string;
  };
  bidStats: {
    count: number;
    avg: number;
  };
  daysLeft: number;
  client: {
    city?: string;
    country?: string;
    rating: number;
    reviewCount: number;
    memberSince?: number;
    verification: {
      payment: boolean;
      email: boolean;
      phone: boolean;
      profile: boolean;
      deposit: boolean;
    };
  };
  skills: string[];
}
