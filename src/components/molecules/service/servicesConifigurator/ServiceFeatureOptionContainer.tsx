"use client";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { useMemo } from "react";
import ServiceOptionRow from "./ServiceOptionRow";
import { useModalStore } from "@/context/modalStore";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { ChevronDownIcon } from "lucide-react";

const ServiceFeatureOptionContainer = ({
  services,
  title,

  modalName,
  isExtra,
}: {
  services: IServiceFeature[];
  title: string;
  btn?: string;
  modalName: string;
  isExtra: boolean | false;
}) => {
  const modals = useModalStore((store) => store.modals);
  const toggle = useModalStore((store) => store.toggle);
  const close = useModalStore((store) => store.close);
  const toggleOption = useServiceConfiguratorStore(
    (store) => store.toggleOption
  );

  const selectedOptions = useServiceConfiguratorStore(
    (store) => store.selectedOptions
  );
  const isOpen = !!modals[modalName];

  const serviceRows = useMemo(
    () =>
      services.map((o) => {
        const isDisabled = !isExtra && o.isIncluded; // included features locked
        const isSelectedInOptions = selectedOptions.some((s) => s.id === o.id);
        return (
          <ServiceOptionRow
            key={o.id}
            option={o}
            checked={!!o.isIncluded || isSelectedInOptions} // <-- ensures boolean
            disabled={isDisabled}
            onToggle={() => {
              if (!isDisabled) toggleOption(o.id, o);
            }}
            isIncluded={o.isIncluded}
          />
        );
      }),
    [services, toggleOption, isExtra, selectedOptions]
  );
  return (
    <>
      <div className="border rounded p-2">
        <div
          className={`header flex justify-between items-center  rounded ${
            !isExtra && "cursor-pointer"
          }`}
          role={!isExtra ? "button" : undefined}
          aria-expanded={isOpen}
          tabIndex={!isExtra ? 0 : undefined}
          onClick={() => !isExtra && toggle(modalName)}
        >
          <div className="text-xl font-semibold px-2  border-b border-spacing-y-2 border-gray-300 rounded-2xl ">
            {title}
          </div>
          <div className="show included_features">
            {!isExtra && (
              <ChevronDownIcon
                className={`w-5 h-5 text-blue-600 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            )}
          </div>
        </div>
        <div
          className={`
    transition-all duration-500 ease-in-out
    ${isOpen || isExtra ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
    ${
      services.length > 5 && (isOpen || isExtra)
        ? "max-h-[430px] overflow-y-auto"
        : ""
    }
  `}
        >
          <div className={`flex flex-col gap-4 py-2`}>{serviceRows}</div>
        </div>
      </div>
      {isExtra
        ? null
        : isOpen && (
            <div
              className={`close mx-auto max-w-8 h-2 bg-gray-500 hover:bg-(--color-text) hover:scale-120 rounded-3xl cursor-pointer ${
                isOpen &&
                "overflow-hidden transition-all duration-400 ease-in-out"
              } `}
              onClick={() => close(modalName)}
            ></div>
          )}
    </>
  );
};

export default ServiceFeatureOptionContainer;
