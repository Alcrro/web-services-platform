"use client";
import { useState, useTransition } from "react";
import { Trash2, Plus, ChevronDown, Loader2, Check } from "lucide-react";
import StatusBadge from "@/components/atoms/StatusBadge";
import type { IServiceOrderStatus } from "@/modules/orders/domain/types/order.types";

interface OrderItem {
  id: string;
  name: string;
  description: string;
  type: "STANDARD" | "OPTIONAL" | "OTHER";
  unitPrice: number;
  quantity: number;
  showPrice: boolean;
}

interface ServiceFeature {
  id: string;
  name: string;
  type: "STANDARD" | "OPTIONAL";
}

interface Props {
  order: {
    id: string;
    projectName: string;
    status: IServiceOrderStatus;
    requirements: string;
    initialPrice: number;
    totalPrice: number;
    createdAt: string;
    serviceName: string;
  };
  client: { name: string; email: string; phone: string };
  serviceFeatures: ServiceFeature[];
  initialItems: OrderItem[];
}

const ALL_STATUSES: IServiceOrderStatus[] = [
  "PENDING_REVIEW", "NEW", "IN_PROGRESS", "IN_DISCUSSION", "APPROVED", "DONE",
];

const ITEM_TYPES = ["STANDARD", "OPTIONAL", "OTHER"] as const;

export default function OrderExtendClient({ order, client, serviceFeatures, initialItems }: Props) {
  const [status, setStatus] = useState<IServiceOrderStatus>(order.status);
  const [items, setItems] = useState<OrderItem[]>(initialItems);
  const [totalPrice, setTotalPrice] = useState(order.totalPrice);
  const [initialPrice, setInitialPrice] = useState(order.initialPrice);

  // Add item form state
  const [addMode, setAddMode] = useState<"feature" | "manual" | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState("");
  const [manualForm, setManualForm] = useState({
    name: "", description: "", type: "STANDARD" as "STANDARD" | "OPTIONAL" | "OTHER",
    unitPrice: 0, quantity: 1,
  });

  const [statusPending, startStatusTransition] = useTransition();
  const [pricingPending, startPricingTransition] = useTransition();
  const [addPending, startAddTransition] = useTransition();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [savedPricing, setSavedPricing] = useState(false);

  const handleStatusChange = (newStatus: IServiceOrderStatus) => {
    startStatusTransition(async () => {
      await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
    });
  };

  const handleSavePricing = () => {
    startPricingTransition(async () => {
      await fetch(`/api/admin/orders/${order.id}/pricing`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initialPrice, totalPrice }),
      });
      setSavedPricing(true);
      setTimeout(() => setSavedPricing(false), 2000);
    });
  };

  const handleAddFromFeature = () => {
    const feature = serviceFeatures.find((f) => f.id === selectedFeatureId);
    if (!feature) return;
    startAddTransition(async () => {
      const res = await fetch(`/api/admin/orders/${order.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: feature.name, type: feature.type, unitPrice: 0, quantity: 1, showPrice: false }),
      });
      const item = await res.json();
      setItems((prev) => [...prev, { id: item.id, name: item.name, description: item.description ?? "", type: item.type, unitPrice: Number(item.unitPrice), quantity: item.quantity, showPrice: item.showPrice }]);
      setAddMode(null);
      setSelectedFeatureId("");
    });
  };

  const handleAddManual = () => {
    startAddTransition(async () => {
      const res = await fetch(`/api/admin/orders/${order.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...manualForm, showPrice: true }),
      });
      const item = await res.json();
      setItems((prev) => [...prev, { id: item.id, name: item.name, description: item.description ?? "", type: item.type, unitPrice: Number(item.unitPrice), quantity: item.quantity, showPrice: item.showPrice }]);
      setAddMode(null);
      setManualForm({ name: "", description: "", type: "STANDARD", unitPrice: 0, quantity: 1 });
    });
  };

  const handleRemoveItem = async (itemId: string) => {
    setRemovingId(itemId);
    await fetch(`/api/admin/orders/${order.id}/items/${itemId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setRemovingId(null);
  };

  const cardCls = "rounded-xl border border-(--color-border) bg-(--color-bg-section) dark:bg-slate-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)]";
  const inputCls = "px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent)";

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
      {/* ── Left: order info (readonly) ── */}
      <div className="flex flex-col gap-5">
        {/* Header card */}
        <div className={`p-5 ${cardCls} flex flex-col gap-4`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-(--color-text-secondary) uppercase tracking-wider mb-1">Project</p>
              <h2 className="text-xl font-bold text-(--color-text)">{order.projectName}</h2>
              <p className="text-sm text-(--color-text-secondary) mt-0.5">{order.serviceName}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div><p className="text-xs text-(--color-text-secondary) mb-0.5">Client</p><p className="font-medium text-(--color-text)">{client.name}</p></div>
            <div><p className="text-xs text-(--color-text-secondary) mb-0.5">Email</p><p className="font-medium text-(--color-text) truncate">{client.email}</p></div>
            <div><p className="text-xs text-(--color-text-secondary) mb-0.5">Date</p><p className="font-medium text-(--color-text)">{new Date(order.createdAt).toLocaleDateString("ro-RO")}</p></div>
          </div>

          {order.requirements && (
            <div>
              <p className="text-xs text-(--color-text-secondary) uppercase tracking-wider mb-1">Client requirements</p>
              <p className="text-sm text-(--color-text) leading-relaxed whitespace-pre-wrap bg-(--color-bg) rounded-lg p-3 border border-(--color-border)">
                {order.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Items list */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider px-1">
            Items ({items.length})
          </p>
          {items.length === 0 && (
            <p className="text-sm text-(--color-text-secondary) px-1">No items yet. Add features from the panel on the right.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className={`flex items-center justify-between gap-3 px-4 py-3 ${cardCls}`}>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-(--color-text) truncate">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-(--color-bg-hover) text-(--color-text-secondary)">
                    {item.type}
                  </span>
                  {item.unitPrice > 0 && (
                    <span className="text-xs text-(--color-text-secondary)">${item.unitPrice} × {item.quantity}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                disabled={removingId === item.id}
                className="text-(--color-text-secondary) hover:text-red-500 transition-colors shrink-0"
              >
                {removingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: actions panel ── */}
      <div className="flex flex-col gap-4 sticky top-4">
        {/* Status */}
        <div className={`p-4 ${cardCls} flex flex-col gap-3`}>
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">Change status</p>
          <div className="flex flex-col gap-1">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={statusPending || s === status}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  s === status
                    ? "bg-(--color-accent)/10 text-(--color-accent) cursor-default"
                    : "text-(--color-text-secondary) hover:bg-(--color-bg-hover) hover:text-(--color-text)"
                }`}
              >
                <span className="capitalize">{s.replace("_", " ").toLowerCase()}</span>
                {s === status && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Add item */}
        <div className={`p-4 ${cardCls} flex flex-col gap-3`}>
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">Add item</p>

          {addMode === null && (
            <div className="flex flex-col gap-2">
              {serviceFeatures.length > 0 && (
                <button
                  onClick={() => setAddMode("feature")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-text) hover:bg-(--color-bg-hover) transition-colors"
                >
                  <Plus className="w-4 h-4 text-(--color-accent)" />
                  From service features
                </button>
              )}
              <button
                onClick={() => setAddMode("manual")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-text) hover:bg-(--color-bg-hover) transition-colors"
              >
                <Plus className="w-4 h-4 text-(--color-accent)" />
                Add manually
              </button>
            </div>
          )}

          {addMode === "feature" && (
            <div className="flex flex-col gap-3">
              <div className="relative">
                <select
                  value={selectedFeatureId}
                  onChange={(e) => setSelectedFeatureId(e.target.value)}
                  className={`${inputCls} w-full appearance-none pr-8`}
                >
                  <option value="">Select a feature...</option>
                  {serviceFeatures.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} ({f.type})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-secondary) pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAddMode(null)} className="flex-1 px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-text-secondary) hover:bg-(--color-bg-hover)">Cancel</button>
                <button onClick={handleAddFromFeature} disabled={!selectedFeatureId || addPending} className="flex-1 px-3 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1">
                  {addPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Add
                </button>
              </div>
            </div>
          )}

          {addMode === "manual" && (
            <div className="flex flex-col gap-3">
              <input placeholder="Feature name" value={manualForm.name} onChange={(e) => setManualForm((f) => ({ ...f, name: e.target.value }))} className={`${inputCls} w-full`} />
              <input placeholder="Description (optional)" value={manualForm.description} onChange={(e) => setManualForm((f) => ({ ...f, description: e.target.value }))} className={`${inputCls} w-full`} />
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <select value={manualForm.type} onChange={(e) => setManualForm((f) => ({ ...f, type: e.target.value as typeof f.type }))} className={`${inputCls} w-full appearance-none pr-7`}>
                    {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--color-text-secondary) pointer-events-none" />
                </div>
                <input type="number" min={0} placeholder="Unit price $" value={manualForm.unitPrice || ""} onChange={(e) => setManualForm((f) => ({ ...f, unitPrice: Number(e.target.value) }))} className={`${inputCls} w-full`} />
              </div>
              <input type="number" min={1} placeholder="Quantity" value={manualForm.quantity} onChange={(e) => setManualForm((f) => ({ ...f, quantity: Number(e.target.value) }))} className={`${inputCls} w-full`} />
              <div className="flex gap-2">
                <button onClick={() => setAddMode(null)} className="flex-1 px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-text-secondary) hover:bg-(--color-bg-hover)">Cancel</button>
                <button onClick={handleAddManual} disabled={!manualForm.name || addPending} className="flex-1 px-3 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1">
                  {addPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className={`p-4 ${cardCls} flex flex-col gap-3`}>
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">Pricing</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-(--color-text-secondary)">Initial price ($)</label>
              <input type="number" min={0} value={initialPrice} onChange={(e) => setInitialPrice(Number(e.target.value))} className={`${inputCls} w-full`} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-(--color-text-secondary)">Total price ($)</label>
              <input type="number" min={0} value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} className={`${inputCls} w-full`} />
            </div>
          </div>
          <button
            onClick={handleSavePricing}
            disabled={pricingPending}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {pricingPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : savedPricing ? <Check className="w-3.5 h-3.5" /> : null}
            {savedPricing ? "Saved!" : "Save pricing"}
          </button>
        </div>
      </div>
    </div>
  );
}
