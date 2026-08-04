import { Code2 } from "lucide-react";
import type { IWorkspaceProjectDetail } from "@/modules/orders/domain/types/workspace.types";

const WorkspaceTechTab = ({ project }: { project: IWorkspaceProjectDetail }) => {
  if (project.techStack.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="w-10 h-10 rounded-xl bg-(--color-accent)/10 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-(--color-accent)" />
        </div>
        <div>
          <p className="text-sm font-medium text-(--color-text)">Tech stack will be updated soon</p>
          <p className="text-xs text-(--color-text-secondary) mt-0.5">
            We&apos;ll list the technologies used for your project here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
        Technologies used
      </p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border bg-gray-50 border-gray-200 text-(--color-text) dark:bg-white/5 dark:border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceTechTab;
