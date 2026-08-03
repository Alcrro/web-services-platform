"use client";
import { IHomeFAQ } from "@/shared/data/consts/homePage/homePageContent";
import FaqItem from "@/components/molecules/FaqItem";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface FAQProps {
  faq: IHomeFAQ[];
}

const FAQ: React.FC<FAQProps> = ({ faq }) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: listRef, inView: listIn, fromAbove: listAbove } = useInView({ once: false, threshold: 0.03 });

  return (
    <section className="py-20 px-4" aria-label="Frequently Asked Questions">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl font-semibold text-center mb-12 text-(--color-text)"
          style={animStyle(titleIn, titleAbove)}
        >
          Frequently Asked Questions
        </h2>

        {/* FaqItem renders its own <li> — wrap in div to avoid li>li */}
        <div ref={listRef} style={animStyle(listIn, listAbove, 80)}>
          <ul className="flex flex-col gap-3">
            {faq.map((item, index) => (
              <FaqItem faq={item} index={String(index)} key={item.question} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
