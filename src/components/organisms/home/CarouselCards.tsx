export const CarouselCards = ({
  children,
  cardWidth,
  style,
}: {
  children: React.ReactNode[];
  cardWidth: number;
  style: Record<string, string>;
}) => (
  <>
    {children.map((child, index) => (
      <div
        key={index}
        className={`${style.review} basis-[${cardWidth}px] snap-start`}
      >
        {child}
      </div>
    ))}
  </>
);
