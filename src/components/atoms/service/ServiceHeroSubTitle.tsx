import Description from "@/shared/ui/Description";

const ServiceHeroSubTitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <Description
      as="p"
      className="text-lg text-(--color-text-secondary) mb-6 max-w-3xl mx-auto"
    >
      {subtitle}
    </Description>
  );
};

export default ServiceHeroSubTitle;
