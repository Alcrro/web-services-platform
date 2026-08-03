import { FC } from "react";
import Link from "next/link";
import { PortfolioProject } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import PortfolioCardImage from "@/components/atoms/portfolio/card/PortfolioCardImage";
import PortfolioCardTitle from "@/components/atoms/portfolio/card/PortfolioCardTitle";
import PortfolioCardDescription from "@/components/atoms/portfolio/card/PortfolioCardDescripion";
import PortfolioTagsItem from "@/components/molecules/portfolio/PortfolioCardTagsItem";

interface PortfolioCardProps {
  project: PortfolioProject;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ project }) => (
  <Link
    href={project.link}
    className="portfolio-card group bg-(--color-bg-section) rounded-2xl flex flex-col border border-(--color-border) hover:border-(--color-accent)/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 overflow-hidden"
  >
    <div className="relative">
      <PortfolioCardImage image={project.image} alt={project.title} />
      <span className="absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm capitalize">
        {project.category}
      </span>
    </div>

    <div className="py-5 px-4 flex-1 flex flex-col gap-2">
      <PortfolioCardTitle title={project.title} />
      <PortfolioCardDescription description={project.description} />
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-(--color-border)">
        {project.tags.map((tag) => {
          if (!tag.value) return null;
          return <PortfolioTagsItem tag={tag} key={tag.type} />;
        })}
      </div>
    </div>
  </Link>
);

export default PortfolioCard;
