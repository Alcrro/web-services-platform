import { FC } from "react";
import HomeHeroTitle from "../../atoms/home/HomeHeroTitle";
import { IHomeHero } from "@/shared/data/consts/homePage/homePageContent";
import HomeHeroSubtitle from "../../atoms/home/HomeHeroSubtitle";
import HomeHeroImage from "../../atoms/home/HomeHeroImage";
import HomeHeroCta from "../../molecules/home/HomeHeroCta";

interface IHomeHeroProps {
  items: IHomeHero;
}

const HomeHero: FC<IHomeHeroProps> = ({ items }) => {
  return (
    <div className="relative">
      <div className="relative h-[520px] w-full overflow-hidden">
        {/* Image slides in from right on load */}
        <div className="anim-fade-right absolute inset-0">
          <HomeHeroImage src={items.image} className="absolute" />
        </div>

        <div className="relative z-20 flex flex-col gap-4 max-w-[520px] h-full justify-center items-center py-6 px-4">
          <div className="anim-fade-up">
            <HomeHeroTitle title={items.title} />
          </div>

          <div className="anim-fade-up anim-delay-100">
            <HomeHeroSubtitle subTitle={items.subtitle} />
          </div>

          <div className="anim-fade-up anim-delay-200 cta flex justify-center max-[320px]:flex-col text-center w-full gap-2">
            <HomeHeroCta cta={items.cta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
