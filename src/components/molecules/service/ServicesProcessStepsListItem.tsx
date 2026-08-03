import { ServiceProcessStep } from "@/shared/data/consts/servicePage/servicePageContent";
import Title from "@/shared/ui/Title";
import { FC } from "react";

interface IServiceProcessStepItemProps {
  step: ServiceProcessStep;
}

const ServicesProcessStepsListItem: FC<IServiceProcessStepItemProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative z-10 w-12 h-12 rounded-full bg-(--color-accent) text-white flex items-center justify-center text-lg font-bold shadow-[0_0_0_4px_var(--color-bg)]">
        {step.step}
      </div>
      <Title as="h3" className="text-base font-semibold text-(--color-text)">
        {step.title}
      </Title>
      <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-[160px]">
        {step.description}
      </p>
    </div>
  );
};

export default ServicesProcessStepsListItem;
