import { usePaginationStore } from "@/store/usePaginationStore";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useGoToPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPage } = usePaginationStore();

  return (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    setPage(page);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
};
