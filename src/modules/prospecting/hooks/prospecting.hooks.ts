"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApplicationAPI } from "../infrastructure/application.api";
import { AnalysisResult, IApplicationFilters, ApplicationStatus, ScrapedJobData } from "../domain/application.types";
import { AnalyzeMetadata } from "../application/validators/application.validators";

const api = new ApplicationAPI();

const QUERY_KEY = ["admin", "applications"] as const;

export function useApplications(filters?: IApplicationFilters) {
  return useQuery({
    queryKey: [...QUERY_KEY, filters],
    queryFn: () => api.findAll(filters),
    staleTime: 1000 * 30,
  });
}

export function usePlatforms() {
  return useQuery({
    queryKey: [...QUERY_KEY, "platforms"],
    queryFn: () => api.getPlatforms(),
    staleTime: 1000 * 60 * 5,
  });
}

interface AnalyzeInput {
  jobDescription: string;
  platform: string;
  metadata?: AnalyzeMetadata;
}

export function useAnalyzeApplication() {
  return useMutation<AnalysisResult, Error, AnalyzeInput>({
    mutationFn: (input) => api.analyze(input),
  });
}

export function useScrapeJob() {
  return useMutation<ScrapedJobData, Error, string>({
    mutationFn: (url) => api.scrape(url),
  });
}

interface CreateApplicationInput {
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

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationInput) => api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      api.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
