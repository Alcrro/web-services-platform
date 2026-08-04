"use client";
import { useState } from "react";
import { Loader2, Sparkles, Check, Plus, X, Save } from "lucide-react";
import { toast } from "react-toastify";
import TiptapEditor from "@/components/molecules/editor/TiptapEditor";

interface ServiceFeature {
  id: string;
  name: string;
  type: "STANDARD" | "OPTIONAL";
  unitPrice: number | null;
}

interface AiMatch {
  serviceFeatureId: string;
  name: string;
  action: "ADD" | "REMOVE";
  unitPrice: number | null;
}

interface AiSuggest {
  name: string;
  description: string;
  estimatedPrice: number | null;
}

interface Props {
  orderId: string;
  serviceFeatures: ServiceFeature[];
  onConfirmed: () => void;
  onCancel: () => void;
}

export default function NewDiscussionForm({ orderId, serviceFeatures, onConfirmed, onCancel }: Props) {
  const [notesHtml, setNotesHtml] = useState("");
  const [notesText, setNotesText] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [discussionId, setDiscussionId] = useState<string | null>(null);

  const [suggestLoading, setSuggestLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [aiMatches, setAiMatches] = useState<AiMatch[]>([]);
  const [aiSuggests, setAiSuggests] = useState<AiSuggest[]>([]);
  const [checkedMatches, setCheckedMatches] = useState<Set<string>>(new Set());
  const [checkedSuggests, setCheckedSuggests] = useState<Set<number>>(new Set());
  const [aiDone, setAiDone] = useState(false);

  const handleEditorChange = (html: string, text: string) => {
    setNotesHtml(html);
    setNotesText(text);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!notesText.trim()) return;
    setSaveLoading(true);
    try {
      if (!discussionId) {
        const res = await fetch(`/api/admin/orders/${orderId}/discussions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes: notesHtml }),
        });
        const d = await res.json();
        setDiscussionId(d.id);
      } else {
        await fetch(`/api/admin/orders/${orderId}/discussions/${discussionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes: notesHtml }),
        });
      }
      setSaved(true);
      toast.success("Discussion saved.");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSuggest = async () => {
    if (!discussionId) return;
    setSuggestLoading(true);
    setAiDone(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/discussions/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesText, discussionId }),
      });
      const data = await res.json();
      const matches: AiMatch[] = data.match ?? [];
      const suggests: AiSuggest[] = data.suggest ?? [];
      setAiMatches(matches);
      setAiSuggests(suggests);
      setCheckedMatches(new Set(matches.filter((m) => m.action === "ADD").map((m) => m.serviceFeatureId)));
      setCheckedSuggests(new Set(suggests.map((_, i) => i)));
      setAiDone(true);
    } catch {
      toast.error("AI unavailable — try again.");
    } finally {
      setSuggestLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!discussionId) return;
    setConfirmLoading(true);
    const items: { name: string; description?: string; type: string; unitPrice: number; quantity: number; showPrice: boolean; action: "ADD" | "REMOVE" }[] = [];

    for (const match of aiMatches) {
      if (!checkedMatches.has(match.serviceFeatureId)) continue;
      const sf = serviceFeatures.find((f) => f.id === match.serviceFeatureId);
      if (!sf) continue;
      items.push({ name: sf.name, type: sf.type, unitPrice: match.unitPrice ?? sf.unitPrice ?? 0, quantity: 1, showPrice: (match.unitPrice ?? sf.unitPrice ?? 0) > 0, action: match.action });
    }
    for (const idx of checkedSuggests) {
      const s = aiSuggests[idx];
      if (!s) continue;
      items.push({ name: s.name, description: s.description, type: "OTHER", unitPrice: s.estimatedPrice ?? 0, quantity: 1, showPrice: (s.estimatedPrice ?? 0) > 0, action: "ADD" });
    }

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/discussions/${discussionId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error();
      const added = items.filter((i) => i.action === "ADD").length;
      const removed = items.filter((i) => i.action === "REMOVE").length;
      toast.success(`Confirmed — ${added > 0 ? `+${added} added` : ""}${added > 0 && removed > 0 ? ", " : ""}${removed > 0 ? `-${removed} removed` : ""}`);
      onConfirmed();
    } catch {
      toast.error("Failed to confirm.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const toggleMatch = (id: string) =>
    setCheckedMatches((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleSuggest = (idx: number) =>
    setCheckedSuggests((prev) => { const s = new Set(prev); s.has(idx) ? s.delete(idx) : s.add(idx); return s; });

  const hasSuggestions = aiDone && (aiMatches.length > 0 || aiSuggests.length > 0);

  return (
    <div className={`grid gap-6 ${hasSuggestions ? "lg:grid-cols-[1fr_340px]" : ""}`}>
      {/* ── Left: conversation editor ── */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
          Conversație cu clientul
        </label>

        <TiptapEditor
          placeholder="Scrie ce ai discutat cu clientul — ce features vrea, modificări, prețuri agreate, deadline-uri..."
          serviceFeatures={serviceFeatures}
          minHeight={hasSuggestions ? "320px" : "220px"}
          onChange={handleEditorChange}
        />

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSave}
            disabled={!notesText.trim() || saveLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved" : "Save discussion"}
          </button>

          {saved && (
            <button
              onClick={handleSuggest}
              disabled={suggestLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--color-border) dark:border-white/10 text-sm text-(--color-text) hover:bg-(--color-bg-hover) disabled:opacity-50 transition-colors"
            >
              {suggestLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-(--color-accent)" />}
              {suggestLoading ? "Analyzing..." : aiDone ? "Re-analyze" : "Get AI suggestions"}
            </button>
          )}

          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--color-border) dark:border-white/10 text-sm text-(--color-text-secondary) hover:bg-(--color-bg-hover) transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>

        {aiDone && !hasSuggestions && (
          <p className="text-sm text-(--color-text-secondary)">
            AI nu a identificat features specifice. Încearcă să fii mai explicit în conversație.
          </p>
        )}
      </div>

      {/* ── Right: AI suggestions ── */}
      {hasSuggestions && (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
            Sugestii AI
          </p>

          {aiMatches.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-wider">Din lista serviciului</p>
              {aiMatches.map((match) => {
                const sf = serviceFeatures.find((f) => f.id === match.serviceFeatureId);
                const checked = checkedMatches.has(match.serviceFeatureId);
                return (
                  <button key={match.serviceFeatureId} onClick={() => toggleMatch(match.serviceFeatureId)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${checked ? "border-(--color-accent) bg-(--color-accent)/5" : "border-(--color-border) dark:border-white/10 bg-(--color-bg)"}`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${checked ? "bg-(--color-accent) border-(--color-accent)" : "border-(--color-border) dark:border-white/20"}`}>
                        {checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-(--color-text) truncate block">{sf?.name ?? match.name}</span>
                        <span className={`text-[10px] font-semibold uppercase ${match.action === "REMOVE" ? "text-red-400" : "text-emerald-500"}`}>
                          {match.action === "REMOVE" ? "− Remove" : "+ Add"}
                        </span>
                      </div>
                    </div>
                    {(match.unitPrice ?? sf?.unitPrice) != null && (
                      <span className="text-xs text-(--color-text-secondary) shrink-0">${match.unitPrice ?? sf?.unitPrice}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {aiSuggests.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-wider">Features noi</p>
              {aiSuggests.map((s, idx) => {
                const checked = checkedSuggests.has(idx);
                return (
                  <button key={idx} onClick={() => toggleSuggest(idx)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${checked ? "border-(--color-accent) bg-(--color-accent)/5" : "border-(--color-border) dark:border-white/10 bg-(--color-bg)"}`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${checked ? "bg-(--color-accent) border-(--color-accent)" : "border-(--color-border) dark:border-white/20"}`}>
                        {checked ? <Check className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-(--color-text-secondary)" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-(--color-text) truncate block">{s.name}</span>
                        {s.description && <span className="text-xs text-(--color-text-secondary) truncate block">{s.description}</span>}
                      </div>
                    </div>
                    {s.estimatedPrice != null && <span className="text-xs text-(--color-text-secondary) shrink-0">~${s.estimatedPrice}</span>}
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={confirmLoading || (checkedMatches.size === 0 && checkedSuggests.size === 0)}
            className="w-full px-3 py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {confirmLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Confirm session
          </button>
        </div>
      )}
    </div>
  );
}
