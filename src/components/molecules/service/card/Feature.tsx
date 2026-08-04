import { Check, Plus } from "lucide-react";

const Feature = ({
  feature,
  variant = "included",
}: {
  feature: string;
  variant?: "included" | "addon";
}) => {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      {variant === "included" ? (
        <span className="mt-0.5 w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-green-500 stroke-[2.5]" />
        </span>
      ) : (
        <span className="mt-0.5 w-4 h-4 rounded-full bg-(--color-accent)/10 flex items-center justify-center shrink-0">
          <Plus className="w-2.5 h-2.5 text-(--color-accent) stroke-[2.5]" />
        </span>
      )}
      <span
        className={`text-sm leading-snug ${
          variant === "included"
            ? "text-(--color-text)"
            : "text-(--color-text-secondary)"
        }`}
      >
        {feature}
      </span>
    </div>
  );
};

export default Feature;
