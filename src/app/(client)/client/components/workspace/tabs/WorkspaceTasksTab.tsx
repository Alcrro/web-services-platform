import { CheckCircle2, Circle, Loader2, TestTube2 } from "lucide-react";
import WorkspaceTaskFeedback from "./WorkspaceTaskFeedback";
import type {
  IWorkspaceFeatureGroup,
  IWorkspaceProjectDetail,
  IWorkspaceTask,
} from "@/modules/orders/domain/types/workspace.types";
import type { TaskStatusType } from "@/modules/tasks/domain/types/task.types";

const taskStatusConfig: Record<
  TaskStatusType,
  { label: string; className: string; icon: React.ReactNode }
> = {
  NOT_STARTED: {
    label: "Not started",
    className: "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/50",
    icon: <Circle className="w-3.5 h-3.5" />,
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  },
  DONE: {
    label: "Done",
    className: "bg-green-50 text-green-600 dark:bg-green-400/10 dark:text-green-400",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  TESTED: {
    label: "Tested",
    className: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    icon: <TestTube2 className="w-3.5 h-3.5" />,
  },
};

const groupStatusLabel = (group: IWorkspaceFeatureGroup | { tasks: IWorkspaceTask[] }) => {
  const tasks = group.tasks;
  if (tasks.length === 0) return null;
  const allDone = tasks.every((t) => t.status === "DONE" || t.status === "TESTED");
  const anyInProgress = tasks.some((t) => t.status === "IN_PROGRESS");
  if (allDone) return { label: "Completed", className: "text-green-600 dark:text-green-400" };
  if (anyInProgress) return { label: "In Progress", className: "text-blue-600 dark:text-blue-400" };
  return { label: "Not Started", className: "text-(--color-text-secondary)" };
};

interface TaskItemProps {
  task: IWorkspaceTask;
  orderId: string;
}

const TaskItem = ({ task, orderId }: TaskItemProps) => {
  const isDone = task.status === "DONE" || task.status === "TESTED";
  const statusCfg = taskStatusConfig[task.status];

  return (
    <div className="flex flex-col gap-1 py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 ${statusCfg.className.split(" ").filter(c => c.startsWith("text-")).join(" ")}`}>
          {statusCfg.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm text-(--color-text) ${isDone ? "line-through opacity-50" : ""}`}>
              {task.title}
            </p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusCfg.className}`}>
              {statusCfg.label}
            </span>
          </div>
          {task.assigneeName && (
            <p className="text-xs text-(--color-text-secondary) mt-0.5">
              Assigned to {task.assigneeName}
            </p>
          )}
        </div>
      </div>
      <div className="pl-6">
        <WorkspaceTaskFeedback
          orderId={orderId}
          taskId={task.id}
          comments={task.comments}
        />
      </div>
    </div>
  );
};

interface GroupProps {
  title: string;
  tasks: IWorkspaceTask[];
  orderId: string;
  doneTasks: number;
  totalTasks: number;
}

const TaskGroup = ({ title, tasks, orderId, doneTasks, totalTasks }: GroupProps) => {
  const groupStatus = groupStatusLabel({ tasks });
  if (tasks.length === 0) return null;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-(--color-text)">{title}</span>
          {groupStatus && (
            <span className={`text-xs font-medium ${groupStatus.className}`}>
              · {groupStatus.label}
            </span>
          )}
        </div>
        <span className="text-xs text-(--color-text-secondary) shrink-0">
          {doneTasks}/{totalTasks}
        </span>
      </div>
      <div className="px-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} orderId={orderId} />
        ))}
      </div>
    </div>
  );
};

const WorkspaceTasksTab = ({ project }: { project: IWorkspaceProjectDetail }) => {
  const totalDone = project.featureGroups.reduce((s, g) => s + g.doneTasks, 0)
    + project.generalTasks.filter((t) => t.status === "DONE" || t.status === "TESTED").length;
  const totalAll = project.totalTasks;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-(--color-text-secondary)">
        {totalDone} of {totalAll} tasks completed across all features
      </p>

      {project.featureGroups.map((group) => (
        <TaskGroup
          key={group.id}
          title={group.name}
          tasks={group.tasks}
          orderId={project.id}
          doneTasks={group.doneTasks}
          totalTasks={group.totalTasks}
        />
      ))}

      {project.generalTasks.length > 0 && (
        <TaskGroup
          title="General"
          tasks={project.generalTasks}
          orderId={project.id}
          doneTasks={project.generalTasks.filter((t) => t.status === "DONE" || t.status === "TESTED").length}
          totalTasks={project.generalTasks.length}
        />
      )}
    </div>
  );
};

export default WorkspaceTasksTab;
