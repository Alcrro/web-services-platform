import DefaultIcon from "../../../shared/ui/icons/defaultIcon";

const HomeHeroImage = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  return (
    <DefaultIcon
      src={src}
      alt="Web development and automation services showcase — homepage hero"
      className={`h-full w-full object-cover object-[cover_65%] rounded-2xl opacity-60 lg:opacity-100 transition-opacity duration-700 ease-in-out ${className}`}
      width={1363} // dimensiune reală
      height={910} // păstrează aspect ratio
      priority // nu lazy load → Lighthouse LCP
      fetchPriority="high" // browser descarcă rapid
      sizes="(max-width: 768px) 100vw, 1363px"
    />
  );
};

export default HomeHeroImage;
