import { Calendar, RefreshCw, ClipboardList } from "lucide-react";
import ProgressBar from "@/components/atoms/ProgressBar";
import type { IWorkspaceProjectDetail } from "@/modules/orders/domain/types/workspace.types";

const WorkspaceOverviewTab = ({ project }: { project: IWorkspaceProjectDetail }) => {
  const createdAt = new Date(project.createdAt).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const updatedAt = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress global */}
      <div className="flex flex-col gap-3 p-4 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-(--color-text)">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-(--color-accent)">
            {project.progressPercent}%
          </span>
        </div>
        <ProgressBar value={project.progressPercent} size="md" />
        <p className="text-xs text-(--color-text-secondary)">
          {project.doneTasks} of {project.totalTasks} tasks completed
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 p-3 rounded-lg border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary)">
            <Calendar className="w-3.5 h-3.5" />
            <span>Order date</span>
          </div>
          <p className="text-sm font-medium text-(--color-text)">{createdAt}</p>
        </div>
        {updatedAt && (
          <div className="flex flex-col gap-1 p-3 rounded-lg border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary)">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Last updated</span>
            </div>
            <p className="text-sm font-medium text-(--color-text)">{updatedAt}</p>
          </div>
        )}
      </div>

      {/* Requirements */}
      {project.requirements && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Your requirements</span>
          </div>
          <div className="p-4 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
            <p className="text-sm text-(--color-text) whitespace-pre-wrap leading-relaxed">
              {project.requirements}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceOverviewTab;
