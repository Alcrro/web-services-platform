interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <span
      className={`rounded-full border-x-2 border-blue-600 animate-spin ${
        className || "p-4"
      }`}
    />
  );
};

export default LoadingSpinner;
