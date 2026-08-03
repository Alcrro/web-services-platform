interface StepCircleProps {
  title: string;
  description: string;
}

const StepCircle: React.FC<StepCircleProps> = ({ title, description }) => (
  <div className="group relative flex flex-col items-center text-center w-28">
    {/* Circle */}
    <div
      className="
        relative z-20 flex flex-col items-center justify-center 
        bg-(--color-bg-section) rounded-full w-28 h-28 p-4 shadow-md 
        transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer
      "
    >
      <span className="text-xs font-medium text-(--color-accent) capitalize mt-1">
        {title}
      </span>
    </div>

    {/* Tooltip */}
    <span
      className="
        absolute z-30  /* <<< FIX — tooltip above circle */
        w-40 left-1/2 -translate-x-1/2 top-full mt-2 
        bg-(--color-bg-section) rounded-2xl p-2 text-(--color-text-secondary) text-sm 
        invisible opacity-0 translate-y-2 
        group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible 
        transition-all duration-300 ease-in-out
      "
    >
      {description}
    </span>
  </div>
);

export default StepCircle;
