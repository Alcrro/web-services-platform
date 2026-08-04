import Link from "next/link";
import { Briefcase } from "lucide-react";
import ProjectCard from "@/components/molecules/client/ProjectCard";
import { fetchWorkspaceProjects } from "./fetchWorkspaceProjects";

const WorkspaceProjectList = async () => {
  const projects = await fetchWorkspaceProjects();

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-(--color-accent)/10 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-(--color-accent)" />
        </div>
        <div>
          <p className="text-sm font-semibold text-(--color-text)">No projects yet</p>
          <p className="text-xs text-(--color-text-secondary) mt-1">
            Once you order a service, your project will appear here.
          </p>
        </div>
        <Link
          href="/client/control-panel/services/catalog"
          className="text-xs font-medium px-4 py-2 rounded-lg bg-(--color-accent) text-white hover:opacity-90 transition-opacity"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default WorkspaceProjectList;
