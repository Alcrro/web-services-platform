import Title from "@/shared/ui/Title";

const PortfolioCardTitle = ({ title }: { title: string }) => {
  return (
    <Title as="h3" className="text-xl font-semibold mb-2 text-(--color-text)">
      {title}
    </Title>
  );
};

export default PortfolioCardTitle;
