"use client";
import { PortfolioFilterItem } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import { FC } from "react";
import PortfolioFiltersButton from "../atoms/buttons/PortfolioFiltersButton";

interface FiltersProps {
  filters: PortfolioFilterItem[];
  activeFilter: string;
  onSelect: (filter: string) => void;
}

const Filters: FC<FiltersProps> = ({ filters, activeFilter, onSelect }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-(--color-bg-section) border border-(--color-border)">
        {filters.map((f) => (
          <PortfolioFiltersButton
            filter={f}
            activeService={activeFilter}
            onSelect={onSelect}
            key={f.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
