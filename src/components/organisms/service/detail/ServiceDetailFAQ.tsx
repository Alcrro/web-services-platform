"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { IServiceFAQ } from "@/shared/data/consts/servicePage/serviceDetailData";

const ServiceDetailFAQ = ({ faqs }: { faqs: IServiceFAQ[] }) => {
  const [open, setOpen] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold text-(--color-text) mb-8 text-center">
        Frequently asked questions
      </h2>
      <div className="max-w-2xl mx-auto flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-(--color-border) bg-(--color-bg-section) overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-(--color-text)">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-(--color-text-secondary) shrink-0 transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-(--color-text-secondary) leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDetailFAQ;
