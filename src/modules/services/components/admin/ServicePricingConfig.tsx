"use client";

import { useUpsertPricingConfig } from "@/modules/services/hooks/adminServices.hooks";
import {
  IPriceDisplayModel,
  IServiceFeature,
  IServicePricingConfig,
} from "@/modules/services/domain/types/service.types";
import { useEffect, useState } from "react";

interface Props {
  serviceUniqueId: string;
  features: IServiceFeature[];
  initialConfig?: IServicePricingConfig | null;
}

const DISPLAY_MODELS: IPriceDisplayModel[] = ["ONE_TIME", "SUBSCRIPTION", "CONTACT"];
const CURRENCIES = ["USD", "EUR", "RON", "GBP"];

const fmt = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

export default function ServicePricingConfig({ serviceUniqueId, features, initialConfig }: Props) {
  const mutation = useUpsertPricingConfig(serviceUniqueId);

  const [form, setForm] = useState({
    hourlyRate: initialConfig?.hourlyRate ?? 0,
    markupRate: initialConfig?.markupRate ?? 1,
    fixedCosts: initialConfig?.fixedCosts ?? 0,
    taxRate: initialConfig?.taxRate ?? 0.19,
    displayPrice: initialConfig?.displayPrice ?? null as number | null,
    displayModel: initialConfig?.displayModel ?? ("ONE_TIME" as IPriceDisplayModel),
    currency: initialConfig?.currency ?? "USD",
  });

  useEffect(() => {
    if (!initialConfig) return;
    setForm({
      hourlyRate: initialConfig.hourlyRate,
      markupRate: initialConfig.markupRate,
      fixedCosts: initialConfig.fixedCosts,
      taxRate: initialConfig.taxRate,
      displayPrice: initialConfig.displayPrice,
      displayModel: initialConfig.displayModel,
      currency: initialConfig.currency,
    });
  }, [initialConfig]);

  const standardFeatures = features.filter(
    (f) => !f.isDeleted && f.type === "STANDARD"
  );
  const totalHours = standardFeatures.reduce((sum, f) => sum + f.hours, 0);
  const baseCost = totalHours * form.hourlyRate * form.markupRate;
  const subtotal = baseCost + form.fixedCosts;
  const taxAmount = subtotal * form.taxRate;
  const calculatedPrice = subtotal + taxAmount;

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync(form);
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-(--color-text)">Pricing Config</h2>
      </div>

      {/* Rates grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.hourlyRate}
            onChange={(e) => set("hourlyRate", Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Markup Rate (×)
          </label>
          <input
            type="number"
            min={1}
            step={0.01}
            value={form.markupRate}
            onChange={(e) => set("markupRate", Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Fixed Costs ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.fixedCosts}
            onChange={(e) => set("fixedCosts", Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Tax Rate (0–1)
          </label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={form.taxRate}
            onChange={(e) => set("taxRate", Number(e.target.value))}
            className={inputCls}
          />
        </div>
      </div>

      {/* Live calculation preview */}
      <div className="rounded-xl border border-(--color-border) bg-(--color-bg-section) p-5 space-y-2 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-3">
          Live Calculation
        </p>
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>
            Standard features: {standardFeatures.length} feature
            {standardFeatures.length !== 1 ? "s" : ""}, {totalHours}h total
          </span>
        </div>
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>
            Base cost ({totalHours}h × {fmt(form.hourlyRate, form.currency)} × {form.markupRate}×)
          </span>
          <span>{fmt(baseCost, form.currency)}</span>
        </div>
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Fixed costs</span>
          <span>+ {fmt(form.fixedCosts, form.currency)}</span>
        </div>
        <div className="flex justify-between text-(--color-text-secondary) border-t border-(--color-border) pt-2">
          <span>Subtotal</span>
          <span>{fmt(subtotal, form.currency)}</span>
        </div>
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Tax ({(form.taxRate * 100).toFixed(0)}%)</span>
          <span>+ {fmt(taxAmount, form.currency)}</span>
        </div>
        <div className="flex justify-between font-semibold text-(--color-text) border-t border-(--color-border) pt-2 text-base">
          <span>Estimated price</span>
          <span>{fmt(calculatedPrice, form.currency)}</span>
        </div>
      </div>

      {/* Display options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Display Model
          </label>
          <select
            value={form.displayModel}
            onChange={(e) => set("displayModel", e.target.value as IPriceDisplayModel)}
            className={inputCls}
          >
            {DISPLAY_MODELS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Currency
          </label>
          <select
            value={form.currency}
            onChange={(e) => set("currency", e.target.value)}
            className={inputCls}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-text-secondary) mb-1">
            Display Price override ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            placeholder={fmt(calculatedPrice, form.currency)}
            value={form.displayPrice ?? ""}
            onChange={(e) =>
              set("displayPrice", e.target.value === "" ? null : Number(e.target.value))
            }
            className={inputCls}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-6 py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-medium hover:bg-(--color-accent-hover) transition-colors disabled:opacity-50"
      >
        {mutation.isPending ? "Saving..." : "Save Pricing"}
      </button>
    </form>
  );
}
