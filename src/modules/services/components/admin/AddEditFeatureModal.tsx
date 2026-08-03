"use client";

import { useAllFeatures, useAddServiceFeature, useUpdateServiceFeature } from "@/modules/services/hooks/adminServices.hooks";
import { IFeatureType, IServiceFeature } from "@/modules/services/domain/types/service.types";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  serviceUniqueId: string;
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: IServiceFeature;
}

const TYPES: IFeatureType[] = ["STANDARD", "OPTIONAL", "OTHER"];

const defaultForm = {
  type: "STANDARD" as IFeatureType,
  hours: 0,
  unitPrice: 0,
  isIncluded: true,
  quantity: 1,
};

export default function AddEditFeatureModal({
  serviceUniqueId,
  open,
  onClose,
  mode,
  initialData,
}: Props) {
  const { data: allFeatures = [] } = useAllFeatures();
  const addMutation = useAddServiceFeature(serviceUniqueId);
  const updateMutation = useUpdateServiceFeature(serviceUniqueId);

  const [search, setSearch] = useState("");
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initialData) {
      setSearch(initialData.feature?.name ?? "");
      setSelectedFeatureId(initialData.featureId);
      setForm({
        type: initialData.type,
        hours: initialData.hours,
        unitPrice: initialData.unitPrice,
        isIncluded: initialData.isIncluded,
        quantity: initialData.quantity ?? 1,
      });
    } else {
      setSearch("");
      setSelectedFeatureId(null);
      setForm(defaultForm);
    }
  }, [open, mode, initialData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!open) return null;

  const filtered = allFeatures.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  const hasExactMatch = allFeatures.some(
    (f) => f.name.toLowerCase() === search.toLowerCase()
  );
  const showCreate = search.trim().length > 0 && !hasExactMatch;

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      if (!selectedFeatureId && !search.trim()) return;
      await addMutation.mutateAsync({
        ...(selectedFeatureId ? { featureId: selectedFeatureId } : { featureName: search.trim() }),
        ...form,
      });
    } else if (mode === "edit" && initialData) {
      await updateMutation.mutateAsync({
        featureId: initialData.featureId,
        data: form,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-(--color-bg) rounded-2xl border border-(--color-border) p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-(--color-text)">
            {mode === "add" ? "Add Feature" : "Edit Feature"}
          </h2>
          <button onClick={onClose} className="text-(--color-text-secondary) hover:text-(--color-text) transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Feature picker */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
              Feature
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedFeatureId(null);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              disabled={mode === "edit"}
              placeholder="Search or create feature..."
              className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40 disabled:opacity-60"
            />
            {dropdownOpen && mode === "add" && (filtered.length > 0 || showCreate) && (
              <div className="absolute z-10 w-full mt-1 bg-(--color-bg) border border-(--color-border) rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filtered.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSearch(f.name);
                      setSelectedFeatureId(f.id);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-(--color-text) hover:bg-(--color-bg-hover) transition-colors"
                  >
                    {f.name}
                  </button>
                ))}
                {showCreate && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFeatureId(null);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-(--color-accent) hover:bg-(--color-bg-hover) transition-colors border-t border-(--color-border)"
                  >
                    + Create &quot;{search.trim()}&quot;
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as IFeatureType }))}
              className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Hours + Unit Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">Hours</label>
              <input
                type="number"
                min={0}
                value={form.hours}
                onChange={(e) => setForm((f) => ({ ...f, hours: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">Unit Price</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.unitPrice}
                onChange={(e) => setForm((f) => ({ ...f, unitPrice: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40"
              />
            </div>
          </div>

          {/* Included toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isIncluded}
              onChange={(e) => setForm((f) => ({ ...f, isIncluded: e.target.checked }))}
              className="w-4 h-4 rounded accent-(--color-accent)"
            />
            <span className="text-sm text-(--color-text)">Included in base package</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-text) hover:bg-(--color-bg-hover) transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || (mode === "add" && !search.trim())}
              className="flex-1 px-4 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-medium hover:bg-(--color-accent-hover) transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : mode === "add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
