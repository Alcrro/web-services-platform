import DefaultIcon from "@/shared/ui/icons/defaultIcon";

const PortfolioCardImage = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <div className="overflow-hidden rounded-t-lg aspect-4/3">
      <DefaultIcon
        src={image}
        alt={alt}
        width={422}
        height={316}
        className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
        priority
        fetchPriority="high"
      />
    </div>
  );
};

export default PortfolioCardImage;
