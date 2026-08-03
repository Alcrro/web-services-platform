interface StepNumberProps {
  number: string;
}

const StepNumber: React.FC<StepNumberProps> = ({ number }) => (
  <span className="text-sm font-semibold text-(--color-text) absolute top-[-30px] left-[45%] max-[420px]:top-1/2 max-[420px]:translate-[-50%] max-[420px]:left-[-20px]">
    {number}
  </span>
);

export default StepNumber;
