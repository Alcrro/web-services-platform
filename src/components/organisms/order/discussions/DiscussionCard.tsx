"use client";
import { useState } from "react";
import { ChevronDown, Check, Clock, Sparkles, Loader2, Plus } from "lucide-react";
import { toast } from "react-toastify";

interface DiscussionItem {
  id: string;
  name: string;
  type: string;
  unitPrice: number | null;
  quantity: number;
  showPrice: boolean;
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

interface ServiceFeature {
  id: string;
  name: string;
  type: "STANDARD" | "OPTIONAL";
  unitPrice: number | null;
}

interface Props {
  id: string;
  orderId: string;
  notes: string;
  summary?: string;
  status: "DRAFT" | "CONFIRMED";
  createdAt: string;
  items: DiscussionItem[];
  serviceFeatures: ServiceFeature[];
  diffAdded?: number;
  diffRemoved?: number;
  isFirst?: boolean;
  onConfirmed: () => void;
}

export default function DiscussionCard({
  id, orderId, notes, summary, status, createdAt, items, serviceFeatures,
  diffAdded = 0, diffRemoved = 0, isFirst = false, onConfirmed,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [aiMatches, setAiMatches] = useState<AiMatch[]>([]);
  const [aiSuggests, setAiSuggests] = useState<AiSuggest[]>([]);
  const [checkedMatches, setCheckedMatches] = useState<Set<string>>(new Set());
  const [checkedSuggests, setCheckedSuggests] = useState<Set<number>>(new Set());
  const [aiDone, setAiDone] = useState(false);

  const date = new Date(createdAt).toLocaleDateString("ro-RO", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  const handleSuggest = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSuggestLoading(true);
    setAiDone(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/discussions/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, discussionId: id }),
      });
      const data = await res.json();
      const matches: AiMatch[] = data.match ?? [];
      const suggests: AiSuggest[] = data.suggest ?? [];
      setAiMatches(matches);
      setAiSuggests(suggests);
      setCheckedMatches(new Set(matches.filter((m) => m.action === "ADD").map((m) => m.serviceFeatureId)));
      setCheckedSuggests(new Set(suggests.map((_, i) => i)));
      setAiDone(true);
      if (!expanded) setExpanded(true);
    } catch {
      toast.error("AI unavailable — try again.");
    } finally {
      setSuggestLoading(false);
    }
  };

  const handleConfirm = async () => {
    setConfirmLoading(true);
    const itemsToSend: { name: string; description?: string; type: string; unitPrice: number; quantity: number; showPrice: boolean; action: "ADD" | "REMOVE" }[] = [];

    for (const match of aiMatches) {
      if (!checkedMatches.has(match.serviceFeatureId)) continue;
      const sf = serviceFeatures.find((f) => f.id === match.serviceFeatureId);
      if (!sf) continue;
      itemsToSend.push({ name: sf.name, type: sf.type, unitPrice: match.unitPrice ?? sf.unitPrice ?? 0, quantity: 1, showPrice: (match.unitPrice ?? sf.unitPrice ?? 0) > 0, action: match.action });
    }
    for (const idx of checkedSuggests) {
      const s = aiSuggests[idx];
      if (!s) continue;
      itemsToSend.push({ name: s.name, description: s.description, type: "OTHER", unitPrice: s.estimatedPrice ?? 0, quantity: 1, showPrice: (s.estimatedPrice ?? 0) > 0, action: "ADD" });
    }

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/discussions/${id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToSend }),
      });
      if (!res.ok) throw new Error();
      const added = itemsToSend.filter((i) => i.action === "ADD").length;
      const removed = itemsToSend.filter((i) => i.action === "REMOVE").length;
      toast.success(`Confirmed — ${added > 0 ? `+${added} added` : ""}${added > 0 && removed > 0 ? ", " : ""}${removed > 0 ? `-${removed} removed` : ""}`);
      onConfirmed();
    } catch {
      toast.error("Failed to confirm.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const toggleMatch = (fid: string) =>
    setCheckedMatches((prev) => { const s = new Set(prev); s.has(fid) ? s.delete(fid) : s.add(fid); return s; });
  const toggleSuggest = (idx: number) =>
    setCheckedSuggests((prev) => { const s = new Set(prev); s.has(idx) ? s.delete(idx) : s.add(idx); return s; });

  const hasSuggestions = aiDone && (aiMatches.length > 0 || aiSuggests.length > 0);

  return (
    <div className="rounded-xl border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)]">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 p-4">
        <button onClick={() => setExpanded((v) => !v)} className="flex items-start gap-3 text-left flex-1 min-w-0">
          <div className="flex flex-col gap-1 min-w-0">
            {/* Meta row: date, status, items count, diff */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-(--color-text-secondary)">{date}</span>
              {status === "CONFIRMED" ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="w-3 h-3" /> Confirmed
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                  <Clock className="w-3 h-3" /> Draft
                </span>
              )}
              <span className="text-[10px] text-(--color-text-secondary)">{items.length} item{items.length !== 1 ? "s" : ""}</span>
              {!isFirst && (diffAdded > 0 || diffRemoved > 0) && (
                <span className="flex items-center gap-1 text-[10px] font-semibold">
                  {diffAdded > 0 && <span className="text-emerald-500">+{diffAdded}</span>}
                  {diffRemoved > 0 && <span className="text-red-400">−{diffRemoved}</span>}
                  <span className="text-(--color-text-secondary)">vs prev</span>
                </span>
              )}
            </div>

            {/* Summary or fallback */}
            {summary ? (
              <p className="text-sm text-(--color-text) line-clamp-2 leading-relaxed">{summary}</p>
            ) : notes ? (
              <p className="text-sm text-(--color-text-secondary) italic line-clamp-2 leading-relaxed">
                {notes.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}
              </p>
            ) : (
              <p className="text-sm text-(--color-text-secondary) italic">No notes</p>
            )}
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          {status === "DRAFT" && (
            <button
              onClick={handleSuggest}
              disabled={suggestLoading || !notes.trim()}
              title="Get AI suggestions"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--color-border) dark:border-white/10 text-xs font-medium text-(--color-text-secondary) hover:text-(--color-accent) hover:border-(--color-accent) disabled:opacity-50 transition-colors"
            >
              {suggestLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {suggestLoading ? "Analyzing..." : "AI suggestions"}
            </button>
          )}
          <ChevronDown
            onClick={() => setExpanded((v) => !v)}
            className={`w-4 h-4 text-(--color-text-secondary) cursor-pointer transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-(--color-border) dark:border-white/10 pt-3">
          {/* Summary block */}
          {summary && (
            <div>
              <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider mb-1">Summary</p>
              <p className="text-sm text-(--color-text) leading-relaxed px-1">{summary}</p>
            </div>
          )}

          {/* Full notes — rendered as HTML */}
          {notes && (
            <div>
              <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider mb-1">Notes</p>
              <div
                className="text-sm text-(--color-text) leading-relaxed bg-(--color-bg) rounded-lg p-3 border border-(--color-border) dark:border-white/10 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_p]:my-0.5 [&_strong]:font-semibold [&_em]:italic"
                dangerouslySetInnerHTML={{ __html: notes }}
              />
            </div>
          )}

          {/* Items added */}
          {items.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider mb-2">Items added</p>
              <div className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-(--color-bg) border border-(--color-border) dark:border-white/10">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-(--color-bg-hover) text-(--color-text-secondary)">{item.type}</span>
                      <span className="text-sm text-(--color-text) truncate">{item.name}</span>
                    </div>
                    {item.unitPrice != null && item.unitPrice > 0 && (
                      <span className="text-xs text-(--color-text-secondary) shrink-0">${item.unitPrice} × {item.quantity}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI suggestions inline */}
          {hasSuggestions && (
            <div className={`grid gap-4 ${aiMatches.length > 0 && aiSuggests.length > 0 ? "sm:grid-cols-2" : ""}`}>
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
            </div>
          )}

          {aiDone && !hasSuggestions && (
            <p className="text-sm text-(--color-text-secondary)">AI nu a identificat features specifice în această discuție.</p>
          )}

          {hasSuggestions && (
            <button
              onClick={handleConfirm}
              disabled={confirmLoading || (checkedMatches.size === 0 && checkedSuggests.size === 0)}
              className="w-full px-3 py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {confirmLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Confirm session
            </button>
          )}
        </div>
      )}
    </div>
  );
}
