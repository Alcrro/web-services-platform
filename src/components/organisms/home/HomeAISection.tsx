"use client";
import { IHomeAISection } from "@/shared/data/consts/homePage/homePageContent";
import { homeIconMap } from "@/shared/data/mappers/homeIconMap";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface HomeAISectionProps {
  aiSection: IHomeAISection;
}

const HomeAISection = ({ aiSection }: HomeAISectionProps) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: gridRef, inView: gridIn, fromAbove: gridAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-10"
          style={animStyle(titleIn, titleAbove)}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-white/40 mb-3">
            AI Integration
          </span>
          <h2 className="text-2xl font-semibold text-(--color-text) mb-3">
            {aiSection.title}
          </h2>
          <p className="text-sm text-(--color-text-secondary) max-w-2xl mx-auto leading-relaxed">
            {aiSection.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {aiSection.tools.map((tool, i) => (
            <div
              key={tool.name}
              className="flex flex-col gap-3 p-6 rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5"
              style={animStyle(gridIn, gridAbove, gridIn ? i * 60 : 0)}
            >
              <span className="text-gray-400 dark:text-white/70">
                {homeIconMap[tool.icon]}
              </span>
              <h3 className="font-semibold text-(--color-text)">{tool.name}</h3>
              <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAISection;
