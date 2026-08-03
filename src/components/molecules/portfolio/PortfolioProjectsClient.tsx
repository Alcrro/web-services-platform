"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Filters from "../Filters";
import {
  PortfolioProject,
  PortfolioFilterItem,
} from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import PortfolioProjectCardSkeleton from "@/components/skeletons/PortfolioProjectCardSkeleton";
import { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface Props {
  projects: PortfolioProject[];
  filters: PortfolioFilterItem[];
  activeFilter: string;
}

export default function PortfolioProjectsClient({
  projects,
  filters,
  activeFilter,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(projects);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDisplayedProjects(projects);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [projects]);

  const handleFilterChange = (category: string) => {
    if (activeFilter === category) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("services", category);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const skeletonCount = projects.length || 6;
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <>
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        onSelect={handleFilterChange}
      />
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 w-full">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <PortfolioProjectCardSkeleton key={idx} />
            ))
          : displayedProjects.map((p, idx) => (
              <div key={p.id} style={animStyle(gridInView, false, idx * 80)}>
                <PortfolioCard project={p} />
              </div>
            ))}
      </div>
    </>
  );
}
