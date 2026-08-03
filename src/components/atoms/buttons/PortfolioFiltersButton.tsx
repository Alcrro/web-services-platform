"use client";
import { FC } from "react";
import { PortfolioFilterItem } from "@/shared/data/consts/portfololioPage/portfolioPageContent";

interface FiltersProps {
  filter: PortfolioFilterItem;
  activeService: string | null;
  onSelect: (key: string) => void;
}

const PortfolioFiltersButton: FC<FiltersProps> = ({ filter, activeService, onSelect }) => {
  const isActive = activeService === filter.key || (!activeService && filter.key === "all");

  return (
    <button
      onClick={() => onSelect(filter.key)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
        isActive
          ? "bg-(--color-accent) text-white shadow-md"
          : "text-(--color-text-secondary) hover:text-(--color-text)"
      }`}
    >
      {filter.name}
    </button>
  );
};

export default PortfolioFiltersButton;
