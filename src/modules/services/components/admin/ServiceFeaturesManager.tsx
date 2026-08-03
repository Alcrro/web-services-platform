"use client";

import { useRemoveServiceFeature } from "@/modules/services/hooks/adminServices.hooks";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddEditFeatureModal from "./AddEditFeatureModal";

interface Props {
  serviceUniqueId: string;
  features: IServiceFeature[];
}

const TYPE_BADGE: Record<string, string> = {
  STANDARD: "bg-(--color-accent)/10 text-(--color-accent)",
  OPTIONAL: "bg-(--color-success)/10 text-(--color-success)",
  OTHER: "bg-(--color-text-secondary)/10 text-(--color-text-secondary)",
};

export default function ServiceFeaturesManager({ serviceUniqueId, features }: Props) {
  const removeMutation = useRemoveServiceFeature(serviceUniqueId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<IServiceFeature | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const active = features.filter((f) => !f.isDeleted);
  const standard = active.filter((f) => f.type === "STANDARD");
  const optional = active.filter((f) => f.type === "OPTIONAL");
  const other = active.filter((f) => f.type === "OTHER");
  const groups = [
    { label: "Included (Standard)", rows: standard },
    { label: "Optional (Add-ons)", rows: optional },
    { label: "Other", rows: other },
  ].filter((g) => g.rows.length > 0);

  const openAdd = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const openEdit = (sf: IServiceFeature) => {
    setEditTarget(sf);
    setModalOpen(true);
  };

  const handleDelete = async (featureId: string) => {
    setPendingDeleteId(featureId);
    try {
      await removeMutation.mutateAsync(featureId);
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--color-text)">Features</h2>
          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-lg bg-(--color-accent) text-white text-sm font-medium hover:bg-(--color-accent-hover) transition-colors"
          >
            + Add Feature
          </button>
        </div>

        {active.length === 0 ? (
          <p className="text-sm text-(--color-text-secondary) py-6 text-center border border-dashed border-(--color-border) rounded-xl">
            No features yet. Add the first one.
          </p>
        ) : (
          <div className="rounded-xl border border-(--color-border) overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-(--color-bg-section) text-(--color-text-secondary) text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Hours</th>
                  <th className="px-4 py-3 font-medium">Unit Price</th>
                  <th className="px-4 py-3 font-medium">Included</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--color-border)">
                {groups.map((group) => (
                  <>
                    <tr key={group.label} className="bg-(--color-bg-section)">
                      <td
                        colSpan={6}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)"
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((sf) => (
                      <tr
                        key={sf.uniqueId}
                        className="bg-(--color-bg) hover:bg-(--color-bg-hover) transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-(--color-text)">
                          {sf.feature?.name ?? sf.name ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_BADGE[sf.type] ?? ""}`}
                          >
                            {sf.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-(--color-text-secondary)">{sf.hours}h</td>
                        <td className="px-4 py-3 text-(--color-text-secondary)">
                          {sf.unitPrice > 0 ? `$${sf.unitPrice}` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${sf.isIncluded ? "bg-(--color-success)" : "bg-(--color-border)"}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => openEdit(sf)}
                              className="p-1.5 rounded-lg text-(--color-text-secondary) hover:text-(--color-accent) hover:bg-(--color-accent)/10 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(sf.featureId)}
                              disabled={pendingDeleteId === sf.featureId}
                              className="p-1.5 rounded-lg text-(--color-text-secondary) hover:text-(--color-error) hover:bg-(--color-error)/10 transition-colors disabled:opacity-40"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddEditFeatureModal
        serviceUniqueId={serviceUniqueId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={editTarget ? "edit" : "add"}
        initialData={editTarget}
      />
    </>
  );
}
