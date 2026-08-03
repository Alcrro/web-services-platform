const PortfolioCardSkeleton = () => (
  <div className="portfolio-card pointer-events-none bg-(--color-bg-section) rounded-2xl min-h-1/3 flex flex-col">
    <div className="overflow-hidden rounded-t-lg animate-pulse bg-(--color-skeleton) aspect-4/3" />

    <div className="py-6 px-3 flex-1 animate-pulse">
      <div className="h-6 bg-(--color-skeleton) rounded mb-2 w-3/4" />
      <div className="h-4 bg-(--color-skeleton) rounded w-full mb-4" />
      <div className="h-4 bg-(--color-skeleton) rounded w-full mb-4" />

      <div className="flex flex-wrap gap-2 justify-between mt-8">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-6 w-12 bg-(--color-skeleton) rounded" />
          ))}
      </div>
    </div>
  </div>
);

export default PortfolioCardSkeleton;
