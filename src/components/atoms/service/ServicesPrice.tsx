import Description from "@/shared/ui/Description";

const ServicesPrice = ({ price }: { price: string }) => {
  return (
    <Description as="span" className="text-lg font-semibold">
      {price}
    </Description>
  );
};

export default ServicesPrice;
