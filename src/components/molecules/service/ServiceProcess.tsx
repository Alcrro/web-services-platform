"use client";
import { ServiceProcessSection } from "@/shared/data/consts/servicePage/servicePageContent";
import Title from "@/shared/ui/Title";
import ServicesProcessStepsListItem from "./ServicesProcessStepsListItem";
import { animStyle, animStyleX, useInView } from "@/shared/hooks/useInView";

const ServiceProcess = ({ process }: { process: ServiceProcessSection }) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: stepsRef, inView: stepsIn } = useInView({ once: false, threshold: 0.05 });

  return (
    <>
      <div ref={titleRef} style={animStyle(titleIn, titleAbove)}>
        <Title as="h2" className="text-3xl font-bold text-center mb-12 text-(--color-text)">
          {process.title}
        </Title>
      </div>

      <div className="relative" ref={stepsRef}>
        <div className="absolute top-6 left-[10%] right-[10%] h-px bg-(--color-border) hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {process.steps.map((step, i) => (
            <div
              key={step.step}
              style={animStyleX(stepsIn, stepsIn ? i * 100 : 0)}
            >
              <ServicesProcessStepsListItem step={step} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceProcess;
