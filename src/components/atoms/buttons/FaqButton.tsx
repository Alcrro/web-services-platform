import { ChevronDown } from "lucide-react";

interface FaqButtonProps {
  question: string;
  isOpen: boolean;
  onClick: () => void;
  ariaControls: string;
}

const FaqButton: React.FC<FaqButtonProps> = ({
  question,
  isOpen,
  onClick,
  ariaControls,
}) => {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-(--color-text) transition-colors hover:text-gray-500 dark:hover:text-white/60 border-0 outline-none bg-transparent"
    >
      <span>{question}</span>
      <ChevronDown
        className={`ml-4 h-4 w-4 shrink-0 text-gray-400 dark:text-white/40 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default FaqButton;
