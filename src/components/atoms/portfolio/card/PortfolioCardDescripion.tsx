import Description from "@/shared/ui/Description";

const PortfolioCardDescription = ({ description }: { description: string }) => {
  return (
    <Description
      as="p"
      className="text-(--color-text-secondary) mb-3 line-clamp-2"
    >
      {description}
    </Description>
  );
};

export default PortfolioCardDescription;
