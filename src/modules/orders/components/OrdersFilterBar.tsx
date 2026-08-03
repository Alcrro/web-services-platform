"use client";
import { useEffect, useRef, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrdersFilters } from "@/shared/hooks/useOrdersFilters";
import { statusMapper } from "@/modules/orders/domain/types/order.types";
import { serviceNameHeaderColumnMapper } from "@/modules/services/domain/types/service.types";

const STATUS_OPTIONS = Object.entries(statusMapper).map(([, v]) => ({
  value: v,
  label: v.charAt(0).toUpperCase() + v.slice(1),
}));

const SERVICE_OPTIONS = Object.entries(serviceNameHeaderColumnMapper).map(
  ([k, v]) => ({ value: k, label: v })
);

const STATUS_STYLE: Record<string, string> = {
  new: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "in progress": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "in discussion": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  done: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

interface DropdownProps {
  label: string;
  value: string | null;
  options: { value: string; label: string }[];
  onChange: (v: string | null) => void;
}

function FilterDropdown({ label, value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors",
          value
            ? "border-(--color-accent) text-(--color-accent) bg-(--color-accent)/5"
            : "border-(--color-border) text-(--color-text-secondary) hover:border-(--color-text-secondary) hover:text-(--color-text)"
        )}
      >
        {selected?.label ?? label}
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className="absolute z-50 top-full mt-1 left-0 min-w-[160px] rounded-xl border border-(--color-border) py-1 shadow-xl"
          style={{ background: "var(--color-bg-section)" }}
        >
          {value && (
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs text-(--color-text-secondary) hover:bg-(--color-bg-hover) transition-colors"
            >
              Clear filter
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm transition-colors hover:bg-(--color-bg-hover)",
                opt.value === value
                  ? "text-(--color-accent) font-medium"
                  : "text-(--color-text)"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersFilterBar() {
  const { filters, hasActiveFilters, setFilter, clearAll } = useOrdersFilters();

  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilter("search", value || null);
    }, 300);
  };

  const activeChips = [
    filters.status && {
      key: "status" as const,
      label: filters.status,
      colorClass: STATUS_STYLE[filters.status] ?? "text-(--color-text-secondary) bg-(--color-bg-hover) border-(--color-border)",
    },
    filters.service && {
      key: "service" as const,
      label:
        serviceNameHeaderColumnMapper[
          filters.service as keyof typeof serviceNameHeaderColumnMapper
        ] ?? filters.service,
      colorClass: "text-(--color-text) bg-(--color-bg-hover) border-(--color-border)",
    },
    filters.dateFrom && {
      key: "dateFrom" as const,
      label: `From ${filters.dateFrom}`,
      colorClass: "text-(--color-text) bg-(--color-bg-hover) border-(--color-border)",
    },
    filters.dateTo && {
      key: "dateTo" as const,
      label: `To ${filters.dateTo}`,
      colorClass: "text-(--color-text) bg-(--color-bg-hover) border-(--color-border)",
    },
  ].filter(Boolean) as { key: keyof typeof filters; label: string; colorClass: string }[];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--color-text-secondary)" />
          <input
            type="text"
            placeholder="Search project..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg text-sm border border-(--color-border) bg-transparent text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:border-(--color-accent) transition-colors w-48"
          />
        </div>

        {/* Status */}
        <FilterDropdown
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(v) => setFilter("status", v)}
        />

        {/* Service */}
        <FilterDropdown
          label="Service"
          value={filters.service}
          options={SERVICE_OPTIONS}
          onChange={(v) => setFilter("service", v)}
        />

        {/* Date range */}
        <div className="flex items-center gap-1">
          <input
            type="date"
            value={filters.dateFrom ?? ""}
            onChange={(e) => setFilter("dateFrom", e.target.value || null)}
            className="px-2.5 py-1.5 rounded-lg text-sm border border-(--color-border) bg-transparent text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
          <span className="text-xs text-(--color-text-secondary)">—</span>
          <input
            type="date"
            value={filters.dateTo ?? ""}
            onChange={(e) => setFilter("dateTo", e.target.value || null)}
            className="px-2.5 py-1.5 rounded-lg text-sm border border-(--color-border) bg-transparent text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
        </div>

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-(--color-text-secondary) hover:text-(--color-text) border border-(--color-border) hover:border-(--color-text-secondary) transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Active chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                chip.colorClass
              )}
            >
              {chip.label}
              <button
                onClick={() => setFilter(chip.key, null)}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Remove ${chip.label} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
