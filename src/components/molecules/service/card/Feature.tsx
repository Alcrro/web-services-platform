import { Check } from "lucide-react";

const Feature = ({
  feature,
  variant = "included",
}: {
  feature: string;
  variant?: "included" | "addon";
}) => {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {variant === "included" ? (
        <Check className="text-green-500 size-4 shrink-0" />
      ) : (
        <span className="size-1.5 rounded-full bg-gray-500 shrink-0 ml-1.5" />
      )}
      <span className="text-sm text-(--color-text)">{feature}</span>
    </div>
  );
};

export default Feature;
