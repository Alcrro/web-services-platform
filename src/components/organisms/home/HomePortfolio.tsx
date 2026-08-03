"use client";
import Link from "next/link";
import Image from "next/image";
import { IHomePortfolio } from "@/shared/data/consts/homePage/homePageContent";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface HomePortfolioProps {
  portfolio: IHomePortfolio;
}

const HomePortfolio = ({ portfolio }: HomePortfolioProps) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: gridRef, inView: gridIn, fromAbove: gridAbove } = useInView({ once: false, threshold: 0.05 });
  const { ref: ctaRef, inView: ctaIn, fromAbove: ctaAbove } = useInView({ once: false, threshold: 0.4 });

  return (
    <section className="py-16 px-4">
      <h2
        ref={titleRef}
        className="text-2xl font-semibold text-center mb-10 text-(--color-text)"
        style={animStyle(titleIn, titleAbove)}
      >
        {portfolio.title}
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
      >
        {portfolio.projects.map((project, i) => (
          <Link
            key={project.name}
            href={project.link}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
            style={animStyle(gridIn, gridAbove, gridIn ? i * 100 : 0)}
          >
            <div className="relative h-52 w-full">
              <Image
                src={project.image}
                alt={`${project.name} — portfolio project`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-(--color-text)">{project.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div ref={ctaRef} className="text-center mt-10" style={animStyle(ctaIn, ctaAbove, 100)}>
        <Link
          href="/portfolio"
          className="inline-block px-6 py-2.5 rounded-lg border border-gray-900/20 text-gray-700 hover:bg-gray-900/5 hover:border-gray-900/30 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/5 dark:hover:border-white/30 transition-all duration-200 text-sm font-medium"
        >
          View full portfolio
        </Link>
      </div>
    </section>
  );
};

export default HomePortfolio;
