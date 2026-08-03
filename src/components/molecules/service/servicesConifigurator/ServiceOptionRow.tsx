"use client";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";
import { FC } from "react";

interface IServiceConfigOptionRow {
  option: IServiceFeature;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isIncluded: boolean;
}
const ServiceOptionRow: FC<IServiceConfigOptionRow> = ({
  option,
  checked,
  onToggle,
  disabled,
  isIncluded,
}) => {
  return (
    <>
      <label
        className={`flex items-center justify-between gap-4 p-3 border rounded ${
          !disabled && "hover:border-gray-400"
        }`}
      >
        <div>
          <div className="font-medium">{option?.feature?.name}</div>
          {option.description && (
            <div className="text-sm text-slate-500">{option.description}</div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!isIncluded && (
            <div className="text-sm">{formatPriceValue(option.unitPrice)}</div>
          )}
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onToggle}
            className={`w-5 h-5 border rounded transition-all duration-200
    ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          />
        </div>
      </label>
    </>
  );
};

export default ServiceOptionRow;
