"use client";

import Button from "@/shared/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationV2({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Button
        variant={currentPage === 1 ? "disabled" : "outline"}
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === currentPage ? "secondary" : "outline"}
            onClick={() => {
              onPageChange(page);
            }}
            className={cn(
              "h-9 w-9 rounded-full transition-all",
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-gray-600"
            )}
          >
            {page}
          </Button>
        ) : (
          <div
            key={index}
            className="h-9 w-9 flex items-center justify-center text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </div>
        )
      )}

      <Button
        variant={currentPage === totalPages ? "disabled" : "outline"}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
