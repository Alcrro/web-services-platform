interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

const ProgressBar = ({ value, showLabel = false, size = "md" }: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`flex-1 ${height} rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-(--color-accent) transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-(--color-text-secondary) shrink-0 w-9 text-right">
          {clamped}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
