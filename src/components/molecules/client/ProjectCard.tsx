import Link from "next/link";
import { Calendar } from "lucide-react";
import StatusBadge from "@/components/atoms/StatusBadge";
import ProgressBar from "@/components/atoms/ProgressBar";
import type { IWorkspaceProjectListItem } from "@/modules/orders/domain/types/workspace.types";

interface ProjectCardProps {
  project: IWorkspaceProjectListItem;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const date = new Date(project.createdAt).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl border bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/[0.08] dark:hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-(--color-text) truncate">
            {project.projectName}
          </p>
          <p className="text-xs text-(--color-text-secondary) mt-0.5 truncate">
            {project.serviceName}
          </p>
        </div>
        <StatusBadge status={project.status} size="sm" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-(--color-text-secondary)">Progress</span>
          <span className="text-xs font-medium text-(--color-text)">
            {project.doneTasks}/{project.totalTasks} tasks
          </span>
        </div>
        <ProgressBar value={project.progressPercent} showLabel size="sm" />
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary)">
          <Calendar className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
        <Link
          href={`/client/control-panel/workspace/detail?id=${project.id}`}
          className="text-xs font-medium text-(--color-accent) hover:underline"
        >
          Open →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
