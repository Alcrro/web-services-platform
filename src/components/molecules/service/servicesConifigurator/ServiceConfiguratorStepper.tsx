"use client";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { useEffect, useMemo, useState } from "react";
import style from "@/components/styles/serviceConfiguratorStepper.module.scss";
import { useParams } from "next/navigation";

const ServiceConfiguratorStepper = () => {
  const [counter, setCounter] = useState<number | string | null>(0);
  const params = useParams(); // [...configurator]
  const currentStep = params.configurator?.[0]; // "features", "client-details", "summary"

  //   const steps = ["Choose service", "Configure features", "Review & export"];
  const steps = [
    { name: "Configure features", id: "features" },
    { name: "Client details", id: "client-details" },
    { name: "Review & export", id: "summary" },
  ];

  const { step, contactInfo, setStep } = useServiceConfiguratorStore(
    (store) => store
  );

  const stepToPath = useMemo(() => {
    return {
      0: "features",
      1: "client-details",
      2: "summary",
    };
  }, []);

  useEffect(() => {
    if (!currentStep) return;

    const stepIndex = Object.values(stepToPath).indexOf(currentStep);

    if (stepIndex >= 0 && stepIndex !== step) {
      setStep(stepIndex);
    }
  }, [currentStep, step, setStep, stepToPath]);

  useEffect(() => {
    const counterFieldsComplete = Object.values(contactInfo).reduce(
      (acc, curr) => {
        if (acc === null) return 0;
        if (typeof curr === "string") return 0;
        if (curr && typeof acc === "number") {
          acc = acc + 1;
        }
        return acc;
      },
      0
    );

    setCounter(counterFieldsComplete);
  }, [contactInfo]);

  const heightMapper: Record<number, number> = {
    0: 0,
    1: 33,
    2: 66,
    3: 100,
  };

  return (
    <nav aria-label="Steps" className=" flex gap-2 items-center">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <div
            className={` w-8 h-8 rounded-full flex items-center justify-center ring-1 relative ${
              i === step && step === 1
                ? `w-8 h-8 rounded-full flex items-center justify-center ring-1 relative ${
                    style.stepper
                  }  ${
                    style[
                      `h${typeof counter === "number" && heightMapper[counter]}`
                    ]
                  }`
                : i === step && step !== 1
                ? ""
                : `w-8 h-8 rounded-full flex items-center justify-center ring-1 relative bg-white text-slate-800 `
            }`}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i + 1}</span>
          </div>
          <div
            className={`hidden sm:block ${
              i === step ? "font-semibold" : "text-sm text-slate-500"
            }`}
          >
            {s.name}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default ServiceConfiguratorStepper;
