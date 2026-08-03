import Description from "@/shared/ui/Description";
import Title from "@/shared/ui/Title";

const ServiceCardHeader = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <>
      <Title as={"h3"} className="text-xl font-bold mb-2">
        {name}
      </Title>
      <Description as="p" className="b-4">
        {description}
      </Description>
    </>
  );
};

export default ServiceCardHeader;
