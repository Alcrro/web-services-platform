"use client";

interface FaqAnswerProps {
  answer: string;
  isOpen: boolean;
  id: string;
}

const FaqAnswer: React.FC<FaqAnswerProps> = ({ answer, isOpen, id }) => {
  return (
    <div
      id={id}
      role="region"
      aria-hidden={!isOpen}
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        opacity: isOpen ? 1 : 0,
        transition: "grid-template-rows 0.35s ease-out, opacity 0.3s ease-out",
      }}
    >
      <div style={{ minHeight: 0, overflow: "hidden" }}>
        <p className="pb-5 pt-1 text-sm leading-relaxed text-gray-500 dark:text-white/50">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FaqAnswer;
