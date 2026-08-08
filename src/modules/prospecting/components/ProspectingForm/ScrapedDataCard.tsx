"use client";

import { CheckCircle2, XCircle, MapPin, Users, Clock } from "lucide-react";
import { ScrapedJobData } from "../../domain/application.types";

const VERIFICATIONS: { key: keyof ScrapedJobData["client"]["verification"]; label: string }[] = [
  { key: "payment", label: "Payment" },
  { key: "deposit", label: "Deposit" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "profile", label: "Profile" },
];

export default function ScrapedDataCard({ data }: { data: ScrapedJobData }) {
  const { client, budget, bidStats, daysLeft, skills, title } = data;

  const deadlineCls =
    daysLeft <= 2
      ? "text-red-500 dark:text-red-400"
      : daysLeft <= 5
        ? "text-amber-500 dark:text-amber-400"
        : "text-green-600 dark:text-green-400";

  return (
    <div className="rounded-lg border bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/30 p-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Date extrase din Freelancer</p>
          <p className="text-xs text-(--color-text) truncate">{title}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-2 py-1.5">
          <p className="text-[10px] text-(--color-text-secondary) mb-0.5">Budget</p>
          <p className="text-xs font-semibold text-(--color-text) leading-tight">{budget.formatted}</p>
        </div>
        <div className="rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-2 py-1.5">
          <p className="text-[10px] text-(--color-text-secondary) mb-0.5 flex items-center gap-1">
            <Users className="w-2.5 h-2.5" /> Bids
          </p>
          <p className="text-xs font-semibold text-(--color-text)">{bidStats.count}</p>
          <p className="text-[10px] text-(--color-text-secondary)">avg {budget.currencySign}{bidStats.avg.toLocaleString()}</p>
        </div>
        <div className="rounded-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-2 py-1.5">
          <p className="text-[10px] text-(--color-text-secondary) mb-0.5 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> Deadline
          </p>
          <p className={`text-xs font-semibold ${deadlineCls}`}>{daysLeft}d</p>
        </div>
      </div>

      {/* Client */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <MapPin className="w-3 h-3 text-(--color-text-secondary) shrink-0" />
          <span className="text-xs text-(--color-text)">
            {[client.city, client.country].filter(Boolean).join(", ") || "Locație necunoscută"}
          </span>
          <span className="text-[10px] text-(--color-text-secondary)">·</span>
          <span className="text-xs text-(--color-text)">
            ★ {client.rating.toFixed(1)} ({client.reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {VERIFICATIONS.map(({ key, label }) => {
            const ok = client.verification[key];
            return (
              <span
                key={key}
                className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  ok
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {ok ? <CheckCircle2 className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skills.map((s) => (
            <span
              key={s}
              className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
