"use client";

import { useState } from "react";
import { Loader2, Search, Link2, X } from "lucide-react";
import { useAnalyzeApplication, usePlatforms, useScrapeJob } from "../../hooks/prospecting.hooks";
import { AnalysisResult, ScrapedJobData } from "../../domain/application.types";
import CreatableSelect from "./CreatableSelect";
import ScrapedDataCard from "./ScrapedDataCard";

interface ProspectingFormProps {
  onResult: (result: AnalysisResult, rawInput: string, platform: string, scrapedData?: ScrapedJobData) => void;
}

const labelCls = "block text-sm font-medium text-(--color-text) mb-1.5";
const textareaCls =
  "w-full px-3 py-2.5 text-sm rounded-lg border resize-none bg-white border-gray-200 text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:border-gray-400 dark:bg-white/5 dark:border-white/10 dark:focus:border-white/30 transition-colors";
const inputCls =
  "flex-1 px-3 py-2 text-sm rounded-lg border bg-white border-gray-200 text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:border-gray-400 dark:bg-white/5 dark:border-white/10 dark:focus:border-white/30 transition-colors";

export default function ProspectingForm({ onResult }: ProspectingFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapedData, setScrapedData] = useState<ScrapedJobData | null>(null);

  const { data: platforms = [] } = usePlatforms();
  const { mutate: analyze, isPending: isAnalyzing, error: analyzeError } = useAnalyzeApplication();
  const { mutate: scrape, isPending: isScraping, error: scrapeError } = useScrapeJob();

  const canSubmit = jobDescription.trim().length >= 50 && platform.trim().length > 0;
  const isFreelancerUrl = scrapeUrl.includes("freelancer.com/projects/");

  const handleScrape = () => {
    if (!isFreelancerUrl) return;
    scrape(scrapeUrl.trim(), {
      onSuccess: (data) => {
        setScrapedData(data);
        setJobDescription(data.description);
        setPlatform("Freelancer");
      },
    });
  };

  const clearScrape = () => {
    setScrapedData(null);
    setScrapeUrl("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const metadata = scrapedData
      ? {
          title: scrapedData.title,
          url: scrapedData.url,
          budget: scrapedData.budget,
          bidStats: scrapedData.bidStats,
          daysLeft: scrapedData.daysLeft,
          client: scrapedData.client,
          skills: scrapedData.skills,
        }
      : undefined;

    analyze(
      { jobDescription: jobDescription.trim(), platform, metadata },
      {
        onSuccess: (result) => {
          onResult(result, jobDescription, platform, scrapedData ?? undefined);
        },
      }
    );
  };

  const charCount = jobDescription.trim().length;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* URL scraper */}
      <div>
        <label className={labelCls}>
          URL Freelancer <span className="text-xs text-(--color-text-secondary) font-normal">(opțional)</span>
        </label>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--color-text-secondary) pointer-events-none" />
            <input
              value={scrapeUrl}
              onChange={(e) => {
                setScrapeUrl(e.target.value);
                if (!e.target.value) clearScrape();
              }}
              placeholder="https://www.freelancer.com/projects/..."
              disabled={isScraping || isAnalyzing}
              className={`${inputCls} pl-8`}
            />
          </div>
          {scrapedData ? (
            <button
              type="button"
              onClick={clearScrape}
              className="p-2 rounded-lg text-(--color-text-secondary) hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="Șterge"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleScrape}
              disabled={!isFreelancerUrl || isScraping || isAnalyzing}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-(--color-text) hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isScraping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />}
              Extrage
            </button>
          )}
        </div>
        {scrapeError && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            {scrapeError.message || "Eroare la extragere. Încearcă să copiezi textul manual."}
          </p>
        )}
      </div>

      {/* Scraped data card */}
      {scrapedData && <ScrapedDataCard data={scrapedData} />}

      {/* Platform */}
      <div>
        <label className={labelCls}>
          Platformă <span className="text-red-500">*</span>
        </label>
        <CreatableSelect
          options={platforms}
          value={platform}
          onChange={setPlatform}
          placeholder="Upwork, Freelancer, Direct..."
          disabled={isAnalyzing}
        />
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelCls.replace("mb-1.5", "")}>
            Job description <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-xs ${charCount >= 50 ? "text-green-500 dark:text-green-400" : "text-(--color-text-secondary)"}`}
          >
            {charCount} / min. 50
          </span>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          disabled={isAnalyzing || isScraping}
          placeholder="Paste-uiește descrierea proiectului de pe Upwork / Freelancer / altă platformă..."
          className={textareaCls}
        />
      </div>

      {analyzeError && (
        <p className="text-sm text-red-500 dark:text-red-400">
          Eroare la analiză. Încearcă din nou.
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || isAnalyzing || isScraping}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Se analizează...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            Analizează
          </>
        )}
      </button>
    </form>
  );
}
