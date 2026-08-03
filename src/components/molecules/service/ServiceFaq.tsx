"use client";
import { ServiceFaqSection } from "@/shared/data/consts/servicePage/servicePageContent";
import Title from "@/shared/ui/Title";
import ServiceFaqListItem from "./ServiceFaqListItem";
import { animStyle, useInView } from "@/shared/hooks/useInView";

const ServiceFaq = ({ faq }: { faq: ServiceFaqSection }) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: listRef, inView: listIn, fromAbove: listAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <>
      <div ref={titleRef} style={animStyle(titleIn, titleAbove)}>
        <Title as="h2" className="text-3xl font-bold text-center mb-12 text-(--color-text)">
          {faq.title}
        </Title>
      </div>

      <div ref={listRef} className="space-y-3" style={animStyle(listIn, listAbove, 80)}>
        {faq.items.map((item) => (
          <ServiceFaqListItem key={item.question} item={item} />
        ))}
      </div>
    </>
  );
};

export default ServiceFaq;
