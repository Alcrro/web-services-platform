import Title from "@/shared/ui/Title";

const PortfolioHeroTitle = ({ title }: { title: string }) => {
  return (
    <Title
      as="h1"
      className="text-5xl font-extrabold md:text-6xl lg:text-7xl bg-gradient-to-r from-(--gradient-hero-from) to-(--gradient-hero-to) bg-clip-text text-transparent"
    >
      {title}
    </Title>
  );
};

export default PortfolioHeroTitle;
