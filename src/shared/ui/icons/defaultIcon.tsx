import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface DefaultIconProps {
  src?: string | StaticImageData; // optional dacă vrei să poți avea și icon ReactNode
  icon?: string | ReactNode;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

const DefaultIcon = ({
  src,
  icon,
  alt,
  className,
  sizes,
  ...imageProps
}: DefaultIconProps) => {
  if (src || typeof icon === "string") {
    return (
      <Image
        src={src || (icon as string)}
        alt={alt}
        width={imageProps.width || 1000}
        height={imageProps.height || 1000}
        className={className}
        sizes={sizes}
        {...imageProps} // priority, fetchPriority etc.
      />
    );
  }

  return <span className={className}>{icon}</span>;
};

export default DefaultIcon;
