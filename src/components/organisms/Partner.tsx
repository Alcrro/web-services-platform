import { ReactNode } from "react";
import style from "@/components/styles/partner.module.scss";
import HomePartnerTitle from "../atoms/home/HomePartnerTitle";

const PartnerMarquee = ({
  children,
  partnersCount,
}: {
  children: ReactNode;
  partnersCount: number;
}) => {
  return (
    <>
      <HomePartnerTitle />
      <div className={`${style.marquee_wrapper}`}>
        <div
          className={` ${
            partnersCount >= 6 ? style.marquee_content : style.content
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PartnerMarquee;
