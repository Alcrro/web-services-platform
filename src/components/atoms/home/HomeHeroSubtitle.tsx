import style from "@/components/styles/homeHeroTitle.module.scss";
import Title from "../../../shared/ui/Title";

const HomeHeroSubtitle = ({ subTitle }: { subTitle: string }) => {
  return (
    <Title
      as={"h2"}
      className={`${style.titleC} text-2xl  text-[clamp(0.2rem,5vw,1.4rem)] text-center`}
    >
      {subTitle}
    </Title>
  );
};

export default HomeHeroSubtitle;
