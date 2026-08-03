import { cn } from "@/lib/utils";
import { FC } from "react";

export const PaginationSkeleton: FC<{ totalPages: number }> = ({
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Previous arrow skeleton */}
      <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />

      {/* Page buttons skeleton */}
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          className={cn(
            "w-9 h-9 rounded-full bg-gray-300 animate-pulse",
            i === 0 ? "bg-gray-400" : ""
          )}
        />
      ))}

      {/* Next arrow skeleton */}
      <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
    </div>
  );
};
