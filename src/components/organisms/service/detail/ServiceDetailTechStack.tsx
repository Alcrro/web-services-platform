const ServiceDetailTechStack = ({ techStack }: { techStack: string[] | null | undefined }) => {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-widest mb-4">
        Tech stack
      </p>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border bg-(--color-bg-section) border-(--color-border) text-(--color-text)"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailTechStack;
