import Button from "@/shared/ui/Button";
import { IHomeHero } from "@/shared/data/consts/homePage/homePageContent";

interface HomeHeroCtaProps {
  cta: IHomeHero["cta"];
}

const HomeHeroCta = ({ cta }: HomeHeroCtaProps) => {
  return (
    <>
      <Button
        variant="neutral"
        href={cta.primary.link}
        className="w-full max-w-60 animate-scaleUp"
      >
        {cta.primary.text}
      </Button>
      <Button
        variant="ghost"
        href={cta.secondary.link}
        className="w-full max-w-60 animate-scaleUp"
      >
        {cta.secondary.text}
      </Button>
    </>
  );
};

export default HomeHeroCta;
