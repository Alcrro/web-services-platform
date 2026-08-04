"use client";
import Button from "@/shared/ui/Button";
import { AnimatedCell } from "@/components/ui/AnimatedText";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { FC } from "react";

interface ActionHeaderProps {
  id: string;
  isLoading: boolean | false;
}

export const ActionHeaderColumn: FC<ActionHeaderProps> = ({ id, isLoading }) => {
  return (
    <div
      className="flex items-center gap-2 justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatedCell isLoading={isLoading} placeholderWidth="4">
        <Button
          href={`/administrator/control-panel/orders/discussions/id/${id}`}
          title="Discussions"
        >
          <MessageSquare
            size={16}
            className="text-(--color-text-secondary) hover:text-(--color-text) cursor-pointer"
          />
        </Button>
      </AnimatedCell>
      <AnimatedCell isLoading={isLoading} placeholderWidth="4">
        <Button
          href={`/administrator/control-panel/orders/extend/id/${id}`}
          title="Extend order"
        >
          <ArrowUpRight
            size={18}
            className="text-(--color-text-secondary) hover:text-(--color-text) cursor-pointer"
          />
        </Button>
      </AnimatedCell>
    </div>
  );
};
