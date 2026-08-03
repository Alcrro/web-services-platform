"use client";
import { ServiceCtaSection } from "@/shared/data/consts/servicePage/servicePageContent";
import Title from "@/shared/ui/Title";
import ServiceCtaButton from "../../atoms/buttons/ServiceCtaButton";
import { useInView } from "@/shared/hooks/useInView";

const ServiceCta = ({ cta }: { cta: ServiceCtaSection }) => {
  const { ref, inView } = useInView({ once: false, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        willChange: "opacity, transform",
      }}
    >
      <Title as="h2" className="text-4xl font-bold text-(--color-bg)">
        {cta.title}
      </Title>
      <p className="text-lg text-(--color-bg)/80 max-w-xl mx-auto">
        {cta.subtitle}
      </p>
      <ServiceCtaButton href={cta.button.href} text={cta.button.text} />
    </div>
  );
};

export default ServiceCta;
