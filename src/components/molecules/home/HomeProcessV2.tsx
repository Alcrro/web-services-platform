import HomeProcessStep from "@/components/molecules/home/HomeProcessStep";
import { IProcessSteps } from "@/shared/data/consts/homePage/homePageContent";
import { Fragment } from "react";

const HomeProcessV2 = ({ steps }: { steps: IProcessSteps[] }) => {
  return (
    <div className=" workflow_progress  flex justify-center items-center gap-10 flex-wrap p-8 pb-2">
      {steps.map((step, index) => (
        <Fragment key={step.number}>
          <HomeProcessStep step={step} showArrow={index > 0} />
        </Fragment>
      ))}
    </div>
  );
};

export default HomeProcessV2;
