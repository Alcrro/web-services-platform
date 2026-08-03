// components/molecules/portfolio/ProjectsGrid.tsx
import { PortfolioProject } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import PortfolioCard from "./PortfolioCard";

interface ProjectsGridProps {
  projects: PortfolioProject[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 w-full">
      {projects.map((p) => (
        <PortfolioCard key={p.id} project={p} />
      ))}
    </div>
  );
}
