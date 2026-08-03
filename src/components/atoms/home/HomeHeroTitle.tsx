import style from "@/components/styles/homeHeroTitle.module.scss";
import Title from "../../../shared/ui/Title";
const HomeHeroTitle = ({ title }: { title: string }) => {
  return (
    <Title
      className={`${style.titleC} font-semibold text-center text-[clamp(1.5rem,5vw,2.75rem)] leading-tight`}
      id="hero-title"
    >
      {title}
    </Title>
  );
};

export default HomeHeroTitle;
