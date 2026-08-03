import { FaArrowRight } from "react-icons/fa";

interface StepArrowProps {
  show: boolean;
}

const StepArrow: React.FC<StepArrowProps> = ({ show }) => {
  if (!show) return null;
  return (
    <span
      className="text-(--color-primary) absolute z-30 left-0 -translate-x-7 top-1/2 -translate-y-1/2 max-[420px]:left-1/2 max-[420px]:-translate-x-2 max-[420px]:top-[-20px] max-[420px]:rotate-90"
      aria-hidden="true"
    >
      <FaArrowRight />
    </span>
  );
};

export default StepArrow;
