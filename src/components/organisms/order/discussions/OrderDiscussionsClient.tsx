"use client";
import { useState } from "react";
import { Plus, MessageSquare } from "lucide-react";
import DiscussionCard from "./DiscussionCard";
import NewDiscussionForm from "./NewDiscussionForm";
import { useRouter } from "next/navigation";

interface DiscussionItem {
  id: string;
  name: string;
  type: "STANDARD" | "OPTIONAL" | "OTHER";
  unitPrice: number | null;
  quantity: number;
  showPrice: boolean;
}

interface Discussion {
  id: string;
  notes: string;
  summary?: string;
  status: "DRAFT" | "CONFIRMED";
  createdAt: string;
  items: DiscussionItem[];
}

interface ServiceFeature {
  id: string;
  name: string;
  type: "STANDARD" | "OPTIONAL";
  unitPrice: number | null;
}

interface Props {
  orderId: string;
  orderName: string;
  serviceFeatures: ServiceFeature[];
  initialDiscussions: Discussion[];
}

function DiscussionSkeleton() {
  return (
    <div className="rounded-xl border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-700/50 p-4 flex flex-col gap-2 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-3 w-24 rounded bg-(--color-bg-hover)" />
        <div className="h-4 w-16 rounded-full bg-(--color-bg-hover)" />
      </div>
      <div className="h-4 w-3/4 rounded bg-(--color-bg-hover)" />
      <div className="h-4 w-1/2 rounded bg-(--color-bg-hover)" />
    </div>
  );
}

export default function OrderDiscussionsClient({
  orderId,
  orderName,
  serviceFeatures,
  initialDiscussions,
}: Props) {
  const router = useRouter();
  const [discussions] = useState<Discussion[]>(initialDiscussions);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const cardCls = "rounded-xl border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)]";

  const handleConfirmed = () => {
    setShowForm(false);
    setRefreshing(true);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-(--color-text-secondary) uppercase tracking-wider mb-0.5">Order</p>
          <h2 className="text-xl font-bold text-(--color-text)">{orderName}</h2>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New discussion
          </button>
        )}
      </div>

      {/* New discussion form — full width, conversation is the hero */}
      {showForm && (
        <div className={`${cardCls} p-5`}>
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider mb-4">
            New discussion
          </p>
          <NewDiscussionForm
            orderId={orderId}
            serviceFeatures={serviceFeatures}
            onConfirmed={handleConfirmed}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* History */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider px-1">
          History ({discussions.length})
        </p>

        {discussions.length === 0 && !showForm && (
          <div className={`${cardCls} p-10 flex flex-col items-center gap-3 text-center`}>
            <MessageSquare className="w-8 h-8 text-(--color-text-secondary)" />
            <p className="text-sm text-(--color-text-secondary)">
              No discussions yet. Start one to log what you agreed with the client.
            </p>
          </div>
        )}

        {refreshing && [0, 1].map((i) => <DiscussionSkeleton key={i} />)}

        {!refreshing && discussions.map((d, idx) => {
          const prev = discussions[idx + 1];
          const prevNames = new Set(prev?.items.map((i) => i.name) ?? []);
          const currNames = new Set(d.items.map((i) => i.name));
          const added = d.items.filter((i) => !prevNames.has(i.name)).length;
          const removed = [...prevNames].filter((n) => !currNames.has(n)).length;
          return (
            <DiscussionCard key={d.id} {...d} orderId={orderId} serviceFeatures={serviceFeatures} diffAdded={added} diffRemoved={removed} isFirst={idx === 0} onConfirmed={handleConfirmed} />
          );
        })}
      </div>
    </div>
  );
}
