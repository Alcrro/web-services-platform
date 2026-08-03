"use client";

import { ServiceFaqItem } from "@/shared/data/consts/servicePage/servicePageContent";
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

interface IServiceFaqItemProps {
  item: ServiceFaqItem;
}

const ServiceFaqListItem: FC<IServiceFaqItemProps> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-(--color-border) rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-(--color-bg) hover:bg-(--color-bg-hover) transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-(--color-text)">{item.question}</span>
        <ChevronDown
          className="w-5 h-5 text-(--color-text-secondary) flex-shrink-0 transition-transform duration-300 ease-out"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-3 text-sm text-(--color-text-secondary) leading-relaxed border-t border-(--color-border)">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default ServiceFaqListItem;
