const ProjectCardSkeleton = () => (
  <div className="flex flex-col gap-4 p-4 rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 animate-pulse">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1 flex flex-col gap-1.5">
        <div className="h-3.5 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-white/10 shrink-0" />
    </div>

    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <div className="h-3 w-12 rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10" />
    </div>

    <div className="flex items-center justify-between mt-auto">
      <div className="h-3 w-20 rounded bg-gray-200 dark:bg-white/10" />
      <div className="h-3 w-12 rounded bg-gray-200 dark:bg-white/10" />
    </div>
  </div>
);

export default ProjectCardSkeleton;
