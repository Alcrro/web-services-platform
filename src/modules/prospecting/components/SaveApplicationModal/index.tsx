"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { AnalysisResult, ScrapedJobData } from "../../domain/application.types";
import { useCreateApplication } from "../../hooks/prospecting.hooks";

interface SaveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  rawInput: string;
  result: AnalysisResult;
  scrapedData?: ScrapedJobData;
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border bg-white border-gray-200 text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:border-gray-400 dark:bg-white/5 dark:border-white/10 dark:focus:border-white/30 transition-colors";
const labelCls = "block text-xs font-medium text-(--color-text-secondary) mb-1";

export default function SaveApplicationModal({
  isOpen,
  onClose,
  platform,
  rawInput,
  result,
  scrapedData,
}: SaveApplicationModalProps) {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate: create, isPending } = useCreateApplication();

  useEffect(() => {
    if (isOpen) {
      setProjectName(scrapedData?.title ?? result.theme);
      setClientName(result.client.name ?? "");
      setBudget("");
      setCurrency(scrapedData?.budget.currency ?? "EUR");
      setLink(scrapedData?.url ?? "");
      setNotes("");
    }
  }, [isOpen, result, scrapedData]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    create(
      {
        platform,
        projectName: projectName.trim(),
        clientName: clientName.trim() || undefined,
        budget: budget ? Number(budget) : undefined,
        currency,
        link: link.trim() || undefined,
        notes: notes.trim() || undefined,
        rawInput,
        aiAnalysis: result,
      },
      {
        onSuccess: () => {
          toast.success("Aplicație salvată.");
          onClose();
        },
        onError: () => {
          toast.error("Eroare la salvare. Încearcă din nou.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border shadow-xl bg-white border-gray-200 dark:bg-[#0f172a] dark:border-white/10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <div>
            <h2 className="text-sm font-semibold text-(--color-text)">Salvează aplicație</h2>
            <p className="text-xs text-(--color-text-secondary) mt-0.5">Status inițial: Applied</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-(--color-text-secondary) hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelCls}>Platformă</label>
              <input value={platform} readOnly className={`${inputCls} opacity-60 cursor-not-allowed`} />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>
                Numele proiectului <span className="text-red-500">*</span>
              </label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="ex: Landing page restaurant"
                className={inputCls}
                required
              />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Numele clientului</label>
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="dacă e menționat"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Bid-ul tău</label>
              <input
                type="number"
                min={0}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={
                  scrapedData
                    ? `client: ${scrapedData.budget.formatted}`
                    : result.estimate.budgetRange
                }
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Monedă</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputCls}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="RON">RON</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Link job posting</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className={inputCls}
              />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Note</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Observații personale..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-900/20 text-gray-900 hover:bg-gray-900/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5 transition-colors disabled:opacity-40"
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={isPending || !projectName.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Se salvează...
                </>
              ) : (
                "Salvează"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
