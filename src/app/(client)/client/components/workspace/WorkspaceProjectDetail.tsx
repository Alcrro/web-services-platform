import Link from "next/link";
import { notFound } from "next/navigation";
import { LayoutDashboard, FileText, Code2, CheckSquare, BarChart2, MessageSquare } from "lucide-react";
import StatusBadge from "@/components/atoms/StatusBadge";
import { fetchWorkspaceProjectDetail } from "./fetchWorkspaceProjectDetail";
import WorkspaceOverviewTab from "./tabs/WorkspaceOverviewTab";
import WorkspaceTasksTab from "./tabs/WorkspaceTasksTab";
import WorkspaceProgressTab from "./tabs/WorkspaceProgressTab";
import WorkspaceDocsTab from "./tabs/WorkspaceDocsTab";
import WorkspaceTechTab from "./tabs/WorkspaceTechTab";
import WorkspaceDiscussionsTab from "./tabs/WorkspaceDiscussionsTab";

const TABS = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "docs", label: "Documentation", icon: FileText },
  { value: "tech", label: "Tech Stack", icon: Code2 },
  { value: "tasks", label: "Tasks", icon: CheckSquare },
  { value: "progress", label: "Progress", icon: BarChart2 },
  { value: "discussions", label: "Discussions", icon: MessageSquare },
] as const;

type TabValue = (typeof TABS)[number]["value"];

interface WorkspaceProjectDetailProps {
  searchParams?: Record<string, string | string[]>;
}

const WorkspaceProjectDetail = async ({
  searchParams = {},
}: WorkspaceProjectDetailProps) => {
  const id = Array.isArray(searchParams.id)
    ? searchParams.id[0]
    : searchParams.id;
  const tab = (
    Array.isArray(searchParams.tab) ? searchParams.tab[0] : searchParams.tab
  ) as TabValue | undefined;
  const activeTab: TabValue = tab && TABS.some((t) => t.value === tab) ? tab : "overview";

  if (!id) notFound();

  const project = await fetchWorkspaceProjectDetail(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex flex-col gap-2 px-4 pt-2 pb-4 border-b border-(--color-border)">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-base font-semibold text-(--color-text)">
            {project.projectName}
          </h1>
          <StatusBadge status={project.status} size="sm" />
        </div>
        <p className="text-xs text-(--color-text-secondary)">{project.serviceName}</p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-(--color-border) overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = tab.value === activeTab;
          const href = `/client/control-panel/workspace/detail?id=${id}&tab=${tab.value}`;
          return (
            <Link
              key={tab.value}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0 ${
                isActive
                  ? "text-(--color-accent) border-(--color-accent)"
                  : "text-(--color-text-secondary) border-transparent hover:text-(--color-text) hover:border-(--color-border)"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "overview" && <WorkspaceOverviewTab project={project} />}
        {activeTab === "docs" && <WorkspaceDocsTab project={project} />}
        {activeTab === "tech" && <WorkspaceTechTab project={project} />}
        {activeTab === "tasks" && <WorkspaceTasksTab project={project} />}
        {activeTab === "progress" && <WorkspaceProgressTab project={project} />}
        {activeTab === "discussions" && <WorkspaceDiscussionsTab orderId={project.id} />}
      </div>
    </div>
  );
};

export default WorkspaceProjectDetail;
