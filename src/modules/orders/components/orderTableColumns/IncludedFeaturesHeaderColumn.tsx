"use client";
import { AnimatedCell } from "@/components/ui/AnimatedText";
import {
  IServiceFeature,
  IServiceOrderTable,
} from "@/modules/services/domain/types/service.types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Cell } from "@tanstack/react-table";
import { FC } from "react";

interface IIncludeFHeProps<TData> {
  getValue: Cell<TData, unknown>["getValue"];
  isLoading: boolean;
}
const IncludedFeaturesHeaderColumn: FC<
  IIncludeFHeProps<IServiceOrderTable>
> = ({ getValue, isLoading }) => {
  const value = getValue<IServiceFeature[]>() || [];
  const tasks = Array.isArray(value) ? value : [];
  return (
    <AnimatedCell value={`${tasks.length} tasks`}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`${
              !isLoading ? "text-blue-600 cursor-pointer" : "text-transparent"
            } `}
            onClick={(e) => e.stopPropagation()}
          >
            {tasks.length} tasks
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 max-h-64 overflow-y-auto p-4 rounded shadow-lg bg-(--color-bg)">
          <ol className="list-decimal list-outside pl-6 space-y-1">
            <div className="title font-semibold">Tasks</div>
            {tasks.map((task, index) => (
              <li key={index}>{task.name}</li>
            ))}
          </ol>
        </PopoverContent>
      </Popover>
    </AnimatedCell>
  );
};

export default IncludedFeaturesHeaderColumn;
