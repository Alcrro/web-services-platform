import { Clock, Package, PlusCircle } from "lucide-react";
import type { IWorkspaceProjectDetail } from "@/modules/orders/domain/types/workspace.types";

const WorkspaceDocsTab = ({ project }: { project: IWorkspaceProjectDetail }) => {
  const optionalItems = project.featureGroups.filter(
    (g) => g.type === "OPTIONAL" || g.type === "OTHER"
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Service description */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
          About this service
        </p>
        <div className="p-4 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
          <p className="text-sm text-(--color-text) leading-relaxed whitespace-pre-wrap">
            {project.serviceDescription}
          </p>
        </div>
      </div>

      {/* Standard features */}
      {project.standardFeatures.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
            Included features
          </p>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {project.standardFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 px-4 py-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <Package className="w-3.5 h-3.5 text-(--color-accent) shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-sm text-(--color-text)">{feature.name}</span>
                    {feature.description && (
                      <p className="text-xs text-(--color-text-secondary) mt-0.5 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary) shrink-0 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{feature.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional / extra items */}
      {optionalItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
            Additional items
          </p>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {optionalItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 px-4 py-3 bg-gray-50 dark:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-3.5 h-3.5 text-(--color-accent) shrink-0" />
                  <span className="text-sm font-medium text-(--color-text)">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-white/50 uppercase">
                    {item.type}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-(--color-text-secondary) pl-6">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDocsTab;
