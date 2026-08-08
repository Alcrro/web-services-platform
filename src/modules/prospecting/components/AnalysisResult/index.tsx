"use client";

import {
  Save, AlertTriangle, HelpCircle, Megaphone, BarChart2, User,
  Wrench, Server, HelpingHand, Target, Clock, FileText, ArrowRight,
  CheckSquare, XSquare, Lightbulb, Zap,
} from "lucide-react";
import { AnalysisResult as AnalysisResultType } from "../../domain/application.types";

interface AnalysisResultProps {
  result: AnalysisResultType;
  onSave: () => void;
}

const cardCls = "rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 p-4 flex flex-col gap-3";
const sectionTitleCls = "flex items-center gap-2 text-sm font-semibold text-(--color-text)";
const subLabelCls = "text-xs font-medium text-(--color-text-secondary) flex items-center gap-1.5";

const complexityConfig = {
  low: { label: "Scăzut", cls: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" },
  medium: { label: "Mediu", cls: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400" },
  high: { label: "Ridicat", cls: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" },
};

const verdictConfig = {
  skip:     { label: "SKIP",     bg: "bg-red-50 dark:bg-red-900/20",     border: "border-red-200 dark:border-red-800/40",     bar: "bg-red-400 dark:bg-red-500",     text: "text-red-600 dark:text-red-400" },
  consider: { label: "CONSIDER", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800/40", bar: "bg-amber-400 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  apply:    { label: "APPLY",    bg: "bg-blue-50 dark:bg-blue-900/20",   border: "border-blue-200 dark:border-blue-800/40",   bar: "bg-blue-400 dark:bg-blue-500",   text: "text-blue-600 dark:text-blue-400" },
  priority: { label: "PRIORITY", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800/40", bar: "bg-green-400 dark:bg-green-500", text: "text-green-600 dark:text-green-400" },
};

const breakdownLabels: Record<string, string> = {
  clientTrust: "Client",
  budget: "Budget",
  competition: "Concurență",
  clarity: "Claritate",
};

function ScoreBar({ value, barCls }: { value: number; barCls: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barCls}`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="text-xs font-medium text-(--color-text) w-4 text-right">{value}</span>
    </div>
  );
}

export default function AnalysisResult({ result, onSave }: AnalysisResultProps) {
  const complexity = complexityConfig[result.estimate.complexity];
  const verdict = verdictConfig[result.score.verdict];
  const { technical, bid, score } = result;

  return (
    <div className="flex flex-col gap-4">

      {/* Score banner */}
      <div className={`rounded-xl border p-4 flex flex-col sm:flex-row gap-4 ${verdict.bg} ${verdict.border}`}>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-center">
            <span className={`text-4xl font-black tabular-nums ${verdict.text}`}>
              {score.value.toFixed(1)}
            </span>
            <span className="text-xs text-(--color-text-secondary)">/10</span>
          </div>
          <span className={`text-sm font-black tracking-widest px-3 py-1 rounded-full ${verdict.text} border ${verdict.border}`}>
            {verdict.label}
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 justify-center">
          {Object.entries(score.breakdown).map(([key, val]) => (
            <div key={key} className="grid grid-cols-[80px_1fr] items-center gap-2">
              <span className="text-xs text-(--color-text-secondary)">{breakdownLabels[key]}</span>
              <ScoreBar value={val} barCls={verdict.bar} />
            </div>
          ))}
        </div>
      </div>

      {/* Client + Estimare */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={cardCls}>
          <p className={sectionTitleCls}>
            <User className="w-4 h-4 text-(--color-accent)" />
            Profilul clientului
          </p>
          {result.client.name && (
            <p className="text-xs text-(--color-text-secondary)">
              <span className="font-medium text-(--color-text)">Nume:</span> {result.client.name}
            </p>
          )}
          <p className="text-sm text-(--color-text)">{result.client.needs}</p>
          {result.client.redFlags && result.client.redFlags.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-1">
              {result.client.redFlags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {flag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={cardCls}>
          <p className={sectionTitleCls}>
            <BarChart2 className="w-4 h-4 text-(--color-accent)" />
            Estimare
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-(--color-text-secondary)">Complexitate:</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${complexity.cls}`}>
              {complexity.label}
            </span>
          </div>
          <p className="text-sm text-(--color-text)">
            <span className="text-(--color-text-secondary) text-xs">Buget: </span>
            {result.estimate.budgetRange}
          </p>
          <p className="text-sm text-(--color-text)">
            <span className="text-(--color-text-secondary) text-xs">Timp: </span>
            {result.estimate.timeEstimate}
          </p>
          <p className="text-xs font-medium mt-1 text-(--color-text)">
            <span className="text-(--color-text-secondary)">Temă: </span>
            {result.theme}
          </p>
        </div>
      </div>

      {/* PRD */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>
          <FileText className="w-4 h-4 text-(--color-accent)" />
          PRD — Ce se construiește
        </p>

        {/* Features */}
        <div className="flex flex-col gap-3">
          {result.prd.features.map((feature, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <p className="text-sm font-semibold text-(--color-text) flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
                {feature.name}
              </p>
              <ul className="flex flex-col gap-1 pl-3">
                {feature.criteria.map((c, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-(--color-text)">
                    <CheckSquare className="w-3 h-3 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Out of scope */}
        {result.prd.outOfScope.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <p className={subLabelCls}><XSquare className="w-3 h-3 text-red-400" /> Out of scope</p>
            <ul className="flex flex-col gap-1">
              {result.prd.outOfScope.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-(--color-text-secondary)">
                  <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Assumptions */}
        {result.prd.assumptions.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <p className={subLabelCls}><Lightbulb className="w-3 h-3 text-amber-400" /> Asumpții</p>
            <ul className="flex flex-col gap-1">
              {result.prd.assumptions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-(--color-text-secondary)">
                  <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Strategie bid */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>
          <Target className="w-4 h-4 text-(--color-accent)" />
          Strategie bid
        </p>

        {/* Delivery */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 self-start">
          <Clock className="w-4 h-4 text-(--color-accent) shrink-0" />
          <div>
            <p className="text-xs text-(--color-text-secondary)">Delivery recomandat</p>
            <p className="text-sm font-bold text-(--color-text)">{bid.recommendedDays} zile</p>
          </div>
        </div>

        {/* Proposal tips */}
        <div className="flex flex-col gap-2">
          <p className={subLabelCls}>
            <FileText className="w-3 h-3" /> Ce să scrii în propunere
          </p>
          <ul className="flex flex-col gap-2">
            {bid.proposalTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-(--color-text)">
                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Next steps */}
        <div className="flex flex-col gap-2 pt-1 border-t border-gray-200 dark:border-white/10">
          <p className={subLabelCls}>
            <ArrowRight className="w-3 h-3" /> Pași după trimiterea bid-ului
          </p>
          <ol className="flex flex-col gap-2">
            {bid.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-(--color-text)">
                <span className="shrink-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-semibold text-(--color-text-secondary)">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Implementare tehnică */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>
          <Wrench className="w-4 h-4 text-(--color-accent)" />
          Implementare tehnică
        </p>

        {technical.canPlan ? (
          <div className="flex flex-col gap-3">
            {technical.stack && technical.stack.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <p className={subLabelCls}>Stack propus</p>
                <div className="flex flex-wrap gap-1.5">
                  {technical.stack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded-md font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {technical.architecture && (
              <div className="flex flex-col gap-1">
                <p className={subLabelCls}><Server className="w-3 h-3" /> Arhitectură</p>
                <p className="text-sm text-(--color-text)">{technical.architecture}</p>
              </div>
            )}

            {technical.hosting && (
              <div className="flex items-center gap-2">
                <p className={subLabelCls}>Hosting:</p>
                <span className="text-xs px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 font-medium">
                  {technical.hosting}
                </span>
              </div>
            )}

            {technical.keyDecisions && technical.keyDecisions.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <p className={subLabelCls}><Zap className="w-3 h-3" /> Decizii tehnice cheie</p>
                <ul className="flex flex-col gap-1.5">
                  {technical.keyDecisions.map((dec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-(--color-text)">
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40" />
                      {dec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {technical.technicalQuestions.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-200 dark:border-white/10">
                <p className={subLabelCls}><HelpingHand className="w-3 h-3" /> Întrebări tehnice rămase</p>
                <ol className="flex flex-col gap-1.5">
                  {technical.technicalQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-(--color-text)">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-[10px] font-semibold text-(--color-text-secondary)">
                        {i + 1}
                      </span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Descrierea e prea vagă pentru a propune o arhitectură. Clarifică mai întâi:
            </p>
            <ol className="flex flex-col gap-2">
              {technical.technicalQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-(--color-text)">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Întrebări + Pitch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={cardCls}>
          <p className={sectionTitleCls}>
            <HelpCircle className="w-4 h-4 text-(--color-accent)" />
            Întrebări pentru client
          </p>
          <ol className="flex flex-col gap-2">
            {result.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-(--color-text)">
                <span className="shrink-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-semibold text-(--color-text-secondary)">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ol>
        </div>

        <div className={cardCls}>
          <p className={sectionTitleCls}>
            <Megaphone className="w-4 h-4 text-(--color-accent)" />
            Cum să răspunzi
          </p>
          <p className="text-sm text-(--color-text) leading-relaxed">{result.pitch}</p>
        </div>
      </div>

      <button
        onClick={onSave}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-gray-900/20 text-gray-900 hover:bg-gray-900/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
      >
        <Save className="w-4 h-4" />
        Salvează aplicație
      </button>
    </div>
  );
}
