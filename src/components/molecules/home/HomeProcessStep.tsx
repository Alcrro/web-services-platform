import StepArrow from "@/components/atoms/home/HomeProcess/StepArrow";
import StepCircle from "@/components/molecules/home/StepCircle";
import StepNumber from "@/components/atoms/home/HomeProcess/StepNumber";
import { IProcessSteps } from "@/shared/data/consts/homePage/homePageContent";

interface HomeProcessStepProps {
  step: IProcessSteps;
  showArrow: boolean;
}

const HomeProcessStep: React.FC<HomeProcessStepProps> = ({
  step,
  showArrow,
}) => (
  <div className="flex flex-col items-center gap relative overflow-visible px-4">
    <StepArrow show={showArrow} />
    <div className="flex items-center gap-4 relative">
      <StepNumber number={step.number} />
      <StepCircle title={step.title} description={step.description} />
    </div>
  </div>
);

export default HomeProcessStep;
