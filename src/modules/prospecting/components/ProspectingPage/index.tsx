"use client";

import { useState } from "react";
import { AnalysisResult, ScrapedJobData } from "../../domain/application.types";
import ProspectingForm from "../ProspectingForm";
import AnalysisResultPanel from "../AnalysisResult";
import SaveApplicationModal from "../SaveApplicationModal";
import ApplicationsTable from "../ApplicationsTable";

interface AnalysisState {
  result: AnalysisResult;
  rawInput: string;
  platform: string;
  scrapedData?: ScrapedJobData;
}

const emptyPanelCls =
  "rounded-xl border border-dashed bg-gray-50 border-gray-200 dark:bg-white/[0.02] dark:border-white/10 flex flex-col items-center justify-center gap-2 p-8 text-center min-h-[180px]";

export default function ProspectingPage() {
  const [analysis, setAnalysis] = useState<AnalysisState | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleResult = (
    result: AnalysisResult,
    rawInput: string,
    platform: string,
    scrapedData?: ScrapedJobData
  ) => {
    setAnalysis({ result, rawInput, platform, scrapedData });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-(--color-text)">Prospecting</h2>
        <p className="text-sm text-(--color-text-secondary) mt-0.5">
          Analizează job posting-uri și urmărește aplicațiile trimise.
        </p>
      </div>

      {/* Form — full width */}
      <div className="rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 p-5">
        <p className="text-sm font-semibold text-(--color-text) mb-4">Job posting</p>
        <div className="max-w-2xl">
          <ProspectingForm onResult={handleResult} />
        </div>
      </div>

      {/* Results — below form */}
      {analysis ? (
        <AnalysisResultPanel
          result={analysis.result}
          onSave={() => setModalOpen(true)}
        />
      ) : (
        <div className={emptyPanelCls}>
          <p className="text-sm font-medium text-(--color-text)">Nicio analiză încă</p>
          <p className="text-xs text-(--color-text-secondary)">
            Paste-uiește un URL Freelancer sau un job posting și apasă &quot;Analizează&quot;.
          </p>
        </div>
      )}

      {/* Table */}
      <ApplicationsTable />

      {/* Modal */}
      {analysis && (
        <SaveApplicationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          platform={analysis.platform}
          rawInput={analysis.rawInput}
          result={analysis.result}
          scrapedData={analysis.scrapedData}
        />
      )}
    </div>
  );
}
