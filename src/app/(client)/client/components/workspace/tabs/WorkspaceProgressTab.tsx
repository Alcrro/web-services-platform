import ProgressBar from "@/components/atoms/ProgressBar";
import type {
  IWorkspaceFeatureGroup,
  IWorkspaceProjectDetail,
  IWorkspaceTask,
} from "@/modules/orders/domain/types/workspace.types";

type FeatureStatus = "Not Started" | "In Progress" | "Completed";

const featureStatusConfig: Record<
  FeatureStatus,
  { className: string; dotClass: string }
> = {
  "Not Started": {
    className: "text-(--color-text-secondary)",
    dotClass: "bg-gray-300 dark:bg-white/20",
  },
  "In Progress": {
    className: "text-blue-600 dark:text-blue-400",
    dotClass: "bg-blue-500",
  },
  Completed: {
    className: "text-green-600 dark:text-green-400",
    dotClass: "bg-green-500",
  },
};

function deriveStatus(
  tasks: (IWorkspaceTask | { status: string })[]
): FeatureStatus {
  if (tasks.length === 0) return "Not Started";
  const allDone = tasks.every(
    (t) => t.status === "DONE" || t.status === "TESTED"
  );
  if (allDone) return "Completed";
  const anyInProgress = tasks.some((t) => t.status === "IN_PROGRESS");
  if (anyInProgress) return "In Progress";
  return "Not Started";
}

interface FeatureProgressCardProps {
  title: string;
  tasks: IWorkspaceTask[];
  doneTasks: number;
  totalTasks: number;
}

const FeatureProgressCard = ({
  title,
  tasks,
  doneTasks,
  totalTasks,
}: FeatureProgressCardProps) => {
  const status = deriveStatus(tasks);
  const { className, dotClass } = featureStatusConfig[status];
  const percent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-(--color-text) truncate">
          {title}
        </span>
        <div className={`flex items-center gap-1.5 shrink-0 text-xs font-medium ${className}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
          {status}
        </div>
      </div>
      <ProgressBar value={percent} showLabel size="sm" />
      <p className="text-xs text-(--color-text-secondary)">
        {doneTasks} of {totalTasks} tasks done
      </p>
    </div>
  );
};

const WorkspaceProgressTab = ({ project }: { project: IWorkspaceProjectDetail }) => {
  const generalDone = project.generalTasks.filter(
    (t) => t.status === "DONE" || t.status === "TESTED"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Progres global */}
      <div className="flex flex-col gap-4 p-5 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider mb-1">
              Overall Progress
            </p>
            <p className="text-3xl font-bold text-(--color-accent)">
              {project.progressPercent}%
            </p>
          </div>
          <p className="text-sm text-(--color-text-secondary) pb-1">
            {project.doneTasks}/{project.totalTasks} tasks
          </p>
        </div>
        <ProgressBar value={project.progressPercent} size="md" />
      </div>

      {/* Per feature */}
      {(project.featureGroups.length > 0 || project.generalTasks.length > 0) && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
              Per Feature
            </p>
            {/* Legenda */}
            <div className="flex items-center gap-3 text-[10px] text-(--color-text-secondary)">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
                Not Started
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Completed
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {project.featureGroups.map((group: IWorkspaceFeatureGroup) => (
              <FeatureProgressCard
                key={group.id}
                title={group.name}
                tasks={group.tasks}
                doneTasks={group.doneTasks}
                totalTasks={group.totalTasks}
              />
            ))}

            {project.generalTasks.length > 0 && (
              <FeatureProgressCard
                title="General"
                tasks={project.generalTasks}
                doneTasks={generalDone}
                totalTasks={project.generalTasks.length}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceProgressTab;
