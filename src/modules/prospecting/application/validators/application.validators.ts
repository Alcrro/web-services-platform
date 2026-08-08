import { z } from "zod/v4";
import { ApplicationStatus } from "../../domain/application.types";

export const ScrapeInputSchema = z.object({
  url: z
    .string()
    .url("URL invalid")
    .refine((u) => u.includes("freelancer.com/projects/"), "Doar URL-uri Freelancer sunt suportate"),
});

const AnalyzeMetadataSchema = z.object({
  title: z.string().optional(),
  url: z.string().optional(),
  budget: z
    .object({
      min: z.number(),
      max: z.number(),
      formatted: z.string(),
      currency: z.string(),
      currencySign: z.string(),
    })
    .optional(),
  bidStats: z.object({ count: z.number(), avg: z.number() }).optional(),
  daysLeft: z.number().optional(),
  client: z
    .object({
      city: z.string().optional(),
      country: z.string().optional(),
      rating: z.number(),
      reviewCount: z.number(),
      verification: z.object({
        payment: z.boolean(),
        email: z.boolean(),
        phone: z.boolean(),
        profile: z.boolean(),
        deposit: z.boolean(),
      }),
    })
    .optional(),
  skills: z.array(z.string()).optional(),
});

export type AnalyzeMetadata = z.infer<typeof AnalyzeMetadataSchema>;

export const AnalyzeInputSchema = z.object({
  jobDescription: z.string().min(50, "Descrierea trebuie să aibă cel puțin 50 de caractere"),
  platform: z.string().min(1, "Platforma este obligatorie").transform((v) =>
    v.trim().replace(/^\w/, (c) => c.toUpperCase())
  ),
  metadata: AnalyzeMetadataSchema.optional(),
});

export const CreateApplicationSchema = z.object({
  platform: z.string().min(1).transform((v) =>
    v.trim().replace(/^\w/, (c) => c.toUpperCase())
  ),
  projectName: z.string().min(1, "Numele proiectului este obligatoriu"),
  clientName: z.string().optional(),
  budget: z.number().positive().optional(),
  currency: z.string().default("EUR"),
  link: z.string().optional(),
  notes: z.string().optional(),
  rawInput: z.string().optional(),
  aiAnalysis: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateStatusSchema = z.object({
  status: z.enum([
    ApplicationStatus.APPLIED,
    ApplicationStatus.INTERVIEW,
    ApplicationStatus.WON,
    ApplicationStatus.LOST,
    ApplicationStatus.NO_RESPONSE,
  ]),
});

export const AnalysisResultSchema = z.object({
  score: z.object({
    value: z.number().min(1).max(10),
    verdict: z.enum(["skip", "consider", "apply", "priority"]),
    breakdown: z.object({
      clientTrust: z.number().min(1).max(10),
      budget: z.number().min(1).max(10),
      competition: z.number().min(1).max(10),
      clarity: z.number().min(1).max(10),
    }),
  }),
  client: z.object({
    name: z.string().optional(),
    needs: z.string(),
    redFlags: z.array(z.string()).optional(),
  }),
  theme: z.string(),
  questions: z.array(z.string()).min(3).max(5),
  pitch: z.string(),
  estimate: z.object({
    complexity: z.enum(["low", "medium", "high"]),
    budgetRange: z.string(),
    timeEstimate: z.string(),
  }),
  bid: z.object({
    recommendedDays: z.number().int().positive(),
    proposalTips: z.array(z.string()).min(3).max(6),
    nextSteps: z.array(z.string()).min(3).max(6),
  }),
  prd: z.object({
    features: z.array(z.object({
      name: z.string(),
      criteria: z.array(z.string()),
    })).min(1),
    outOfScope: z.array(z.string()),
    assumptions: z.array(z.string()),
  }),
  technical: z.object({
    canPlan: z.boolean(),
    stack: z.array(z.string()).optional(),
    architecture: z.string().optional(),
    hosting: z.string().optional(),
    keyDecisions: z.array(z.string()).optional(),
    technicalQuestions: z.array(z.string()),
  }),
});
