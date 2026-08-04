import { Check, Plus } from "lucide-react";
import type { IServiceFeature } from "@/modules/services/domain/types/service.types";

const ServiceDetailFeatures = ({ features }: { features: IServiceFeature[] }) => {
  const standard = features.filter((f) => f.type === "STANDARD");
  const optional = features.filter((f) => f.type !== "STANDARD");

  return (
    <div className="flex flex-col gap-8">
      {/* Included */}
      <div>
        <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-widest mb-4">
          What&apos;s included
        </p>
        <div className="flex flex-col gap-1">
          {standard.map((f) => (
            <div
              key={f.id}
              className="flex items-start gap-3 p-4 rounded-xl border border-(--color-border) bg-(--color-bg-section) hover:border-(--color-accent)/30 transition-colors"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500 stroke-[2.5]" />
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-semibold text-(--color-text)">{f.feature?.name ?? f.name}</span>
                {f.feature?.description && (
                  <span className="text-sm text-(--color-text-secondary) leading-relaxed">
                    {f.feature.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      {optional.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-widest mb-4">
            Add-ons available
          </p>
          <div className="flex flex-col gap-1">
            {optional.map((f) => (
              <div
                key={f.id}
                className="flex items-start gap-3 p-4 rounded-xl border border-(--color-border) bg-(--color-bg-section) hover:border-(--color-accent)/30 transition-colors"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-(--color-accent)/10 flex items-center justify-center shrink-0">
                  <Plus className="w-3 h-3 text-(--color-accent) stroke-[2.5]" />
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-semibold text-(--color-text)">{f.feature?.name ?? f.name}</span>
                  {f.feature?.description && (
                    <span className="text-sm text-(--color-text-secondary) leading-relaxed">
                      {f.feature.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailFeatures;
