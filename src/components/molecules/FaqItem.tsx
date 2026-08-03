"use client";
import React from "react";
import { IHomeFAQ } from "@/shared/data/consts/homePage/homePageContent";
import FaqButton from "../atoms/buttons/FaqButton";
import FaqAnswer from "../atoms/FaqAnswer";
import { useModalStore } from "@/context/modalStore";

interface FaqItemProps {
  faq: IHomeFAQ;
  index: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, index }) => {
  const { modals, toggle } = useModalStore((store) => store);
  const isOpen = !!modals[index];

  return (
    <li className={`rounded-xl px-6 transition-colors duration-200 ${isOpen ? "bg-gray-100 dark:bg-white/[0.08]" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/[0.07]"}`}>
      <FaqButton
        question={faq.question}
        isOpen={isOpen}
        onClick={() => toggle(index)}
        ariaControls={`faq-answer-${index}`}
      />
      <FaqAnswer
        answer={faq.answer}
        isOpen={isOpen}
        id={`faq-answer-${index}`}
      />
    </li>
  );
};

export default FaqItem;
