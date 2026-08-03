"use client";
import { IHomeProcess } from "@/shared/data/consts/homePage/homePageContent";
import { FaNetworkWired } from "react-icons/fa";
import HomeProcessV2 from "../../molecules/home/HomeProcessV2";
import { animStyle, useInView } from "@/shared/hooks/useInView";

const ProcessWorkflow = ({ process }: { process: IHomeProcess }) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: stepsRef, inView: stepsIn, fromAbove: stepsAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <div className="workflow py-4">
      <div
        ref={titleRef}
        className="flex gap-2 justify-center items-center font-semibold text-2xl py-2 max-[420px]:text-center max-[420px]:flex-col"
        style={animStyle(titleIn, titleAbove)}
      >
        <FaNetworkWired />
        {process.title}
      </div>

      <div ref={stepsRef} style={animStyle(stepsIn, stepsAbove, 100)}>
        <HomeProcessV2 steps={process.steps} />
      </div>
    </div>
  );
};

export default ProcessWorkflow;
