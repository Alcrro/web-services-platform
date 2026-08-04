import ProjectCardSkeleton from "@/components/molecules/client/ProjectCardSkeleton";

const WorkspaceProjectListSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <ProjectCardSkeleton />
    <ProjectCardSkeleton />
    <ProjectCardSkeleton />
  </div>
);

export default WorkspaceProjectListSkeleton;
