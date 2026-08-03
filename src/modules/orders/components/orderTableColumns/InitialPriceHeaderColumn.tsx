"use client";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSortableColumn } from "../../../../shared/utils/handleSort";

const InitialPriceHeaderColumn = () => {
  const { currentDirection, currentField, onClick } =
    useSortableColumn("initialPrice");

  const isActive = currentField === "initialPrice";

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider hover:text-(--color-text) transition-colors cursor-pointer"
    >
      Initial Price
      {isActive && currentDirection === "asc" && (
        <ArrowUp size={12} className="text-(--color-accent)" />
      )}
      {isActive && currentDirection === "desc" && (
        <ArrowDown size={12} className="text-(--color-accent)" />
      )}
      {!isActive && <ArrowUpDown size={12} className="opacity-30" />}
    </button>
  );
};

export default InitialPriceHeaderColumn;
