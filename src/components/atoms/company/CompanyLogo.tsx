import { companyDetails } from "@/shared/data/consts/companyDetails/companyDetails";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface LogoWithImage {
  src: true;
  children?: ReactNode;
}
interface LogoWithText {
  src?: false;
  children: ReactNode;
}
type CompanyLogoProps = LogoWithImage | LogoWithText;
const CompanyLogo: FC<CompanyLogoProps> = ({ src, children }) => {
  return (
    <Link className="text-[#2563EB] text-2xl uppercase" href={"/"}>
      {src ? (
        <Image
          src={companyDetails.logo}
          alt={"company logo"}
          width={1000}
          height={1000}
          className="w-[30px] h-[30px]"
        />
      ) : (
        <span>{children}</span>
      )}
    </Link>
  );
};

export default CompanyLogo;
