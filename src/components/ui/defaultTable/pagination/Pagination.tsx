"use client";
import Button from "@/shared/ui/Button";
import { IMetaPagination } from "@/modules/globals/types/types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface IMetaPaginationProps {
  meta: IMetaPagination;
}
const Pagination: FC<IMetaPaginationProps> = ({ meta }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = (meta.page ?? 1) > 0 ? meta.page ?? 1 : 1;
  const totalPages = Math.max(1, meta?.totalPages ?? 1);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex gap-2" role="navigation" aria-label="Pagination">
      <Button
        onClick={() => canGoPrev && goToPage(currentPage - 1)}
        className={`${!canGoPrev ? "text-gray-400" : "cursor-pointer"}`}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        <ArrowLeftCircle />
      </Button>
      {Array.from({ length: meta.totalPages! }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <Button
            onClick={() => goToPage(page)}
            key={page}
            className={`
            ${
              isActive
                ? "font-semibold underline underline-offset-2"
                : "cursor-pointer"
            } `}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Button>
        );
      })}
      <Button
        onClick={() => canGoNext && goToPage(currentPage + 1)}
        className={`${!canGoNext ? " text-gray-400" : "cursor-pointer"}`}
        disabled={!canGoNext}
      >
        <ArrowRightCircle />
      </Button>
    </div>
  );
};

export default Pagination;
