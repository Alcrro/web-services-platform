"use client";
import { FC } from "react";
import PortfolioCtaBtn from "@/components/atoms/portfolio/PortfolioCtaBtn";
import PortfolioCtaTitle from "@/components/atoms/portfolio/PortfolioCtaTitle";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface CTASectionProps {
  title: string;
  buttonText: string;
  buttonHref: string;
}

const PortfolioCta: FC<CTASectionProps> = ({ title, buttonText, buttonHref }) => {
  const { ref, inView, fromAbove } = useInView();

  return (
    <div ref={ref} className="space-y-2" style={animStyle(inView, fromAbove)}>
      <PortfolioCtaTitle title={title} />
      <PortfolioCtaBtn href={buttonHref} text={buttonText} />
    </div>
  );
};

export default PortfolioCta;
