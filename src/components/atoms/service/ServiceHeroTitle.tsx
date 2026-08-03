import Title from "@/shared/ui/Title";

const ServiceHeroTitle = ({ title }: { title: string }) => {
  return (
    <Title
      as="h1"
      className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-(--color-text)"
    >
      {title}
    </Title>
  );
};

export default ServiceHeroTitle;
