"use client";
import { IHomeBenefits } from "@/shared/data/consts/homePage/homePageContent";
import { homeIconMap } from "@/shared/data/mappers/homeIconMap";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface HomeBenefitsProps {
  benefits: IHomeBenefits[];
}

const HomeBenefits = ({ benefits }: HomeBenefitsProps) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: gridRef, inView: gridIn, fromAbove: gridAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <section className="py-16 px-4">
      <h2
        ref={titleRef}
        className="text-2xl font-semibold text-center mb-10 text-(--color-text)"
        style={animStyle(titleIn, titleAbove)}
      >
        Why Work With Us
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
      >
        {benefits.map((benefit, i) => (
          <div
            key={benefit.title}
            className="flex flex-col items-center gap-4 p-6 rounded-xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 text-center"
            style={animStyle(gridIn, gridAbove, gridIn ? i * 80 : 0)}
          >
            <span className="text-gray-400 dark:text-white/70">
              {homeIconMap[benefit.icon]}
            </span>
            <h3 className="font-medium text-(--color-text)">{benefit.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBenefits;
