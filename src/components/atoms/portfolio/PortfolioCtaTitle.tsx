import Title from "@/shared/ui/Title";

const PortfolioCtaTitle = ({ title }: { title: string }) => {
  return (
    <Title as={"h2"} className="text-4xl font-bold mb-6 text-white">
      {title}
    </Title>
  );
};

export default PortfolioCtaTitle;
