import { FC, Fragment } from "react";
import PortfolioHeroTitle from "../../atoms/portfolio/PortfolioHeroTitle";
import PortfolioHeroSubTitle from "../../atoms/portfolio/PortfolioHeroSubTitle";
import PortfolioHeroButton from "../../atoms/buttons/PortfolioHeroButton";
import { PortfolioHeroSection } from "@/shared/data/consts/portfololioPage/portfolioPageContent";

const ANIM = "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both";

const HeroSection: FC<PortfolioHeroSection> = ({
  title,
  subtitle,
  cta,
  badge,
  stats,
}) => (
  <>
    <div className={ANIM} style={{ animationDelay: "0ms" }}>
      <span className="inline-flex items-center gap-2 rounded-full border border-(--color-accent)/30 bg-(--color-accent)/10 text-(--color-accent) text-sm font-semibold px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" aria-hidden />
        {badge}
      </span>
    </div>

    <div className={ANIM} style={{ animationDelay: "150ms" }}>
      <PortfolioHeroTitle title={title} />
    </div>

    <div className={ANIM} style={{ animationDelay: "300ms" }}>
      <PortfolioHeroSubTitle subtitle={subtitle} />
    </div>

    <div className={ANIM} style={{ animationDelay: "450ms" }}>
      <PortfolioHeroButton cta={cta} />
    </div>

    <div
      className={`${ANIM} flex flex-wrap justify-center items-center pt-8`}
      style={{ animationDelay: "600ms" }}
    >
      {stats.map((stat, i) => (
        <Fragment key={stat.label}>
          <div className="px-8 py-2 text-center">
            <p className="text-3xl font-bold text-(--color-accent)">{stat.value}</p>
            <p className="text-sm text-(--color-text-secondary) mt-0.5">{stat.label}</p>
          </div>
          {i < stats.length - 1 && (
            <div className="h-10 w-px bg-(--color-border)" aria-hidden />
          )}
        </Fragment>
      ))}
    </div>
  </>
);

export default HeroSection;
