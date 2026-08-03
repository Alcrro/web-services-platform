"use client";
import { ServiceBenefitsSection } from "@/shared/data/consts/servicePage/servicePageContent";
import { MessageSquare, Rocket, Shield, Target } from "lucide-react";
import { LucideIcon } from "lucide-react";
import ServiceBenefitsTitle from "../../../atoms/service/ServiceBenefitsTitle";
import ServiceBenefitsItem from "./ServiceBenefitsItem";
import { animStyle, useInView } from "@/shared/hooks/useInView";
import CardTilt from "@/components/atoms/CardTilt";

const ICONS: LucideIcon[] = [Rocket, Target, Shield, MessageSquare];

const ServicesBenefits = ({ benefits }: { benefits: ServiceBenefitsSection }) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: gridRef, inView: gridIn, fromAbove: gridAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <>
      <div ref={titleRef} style={animStyle(titleIn, titleAbove)}>
        <ServiceBenefitsTitle title={benefits.title} />
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.items.map((item, i) => (
          <div
            key={item.title}
            style={animStyle(gridIn, gridAbove, gridIn ? i * 90 : 0)}
          >
            <CardTilt intensity={7}>
              <ServiceBenefitsItem item={item} Icon={ICONS[i]} />
            </CardTilt>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicesBenefits;
