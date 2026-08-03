import Link from "next/link";
import { FC } from "react";

interface IServiceCtaHeroBtnProps {
  hero: { href: string; text: string };
}

const ServiceCtaHeroBtn: FC<IServiceCtaHeroBtnProps> = ({ hero }) => {
  return (
    <Link
      href={hero.href}
      className="inline-flex items-center gap-2 px-8 py-3.5 bg-(--color-accent) text-white text-base font-semibold rounded-xl hover:bg-(--color-accent-hover) transition-colors"
    >
      {hero.text}
    </Link>
  );
};

export default ServiceCtaHeroBtn;
