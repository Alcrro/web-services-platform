"use client";
import Link from "next/link";
import { IHomeService } from "@/shared/data/consts/homePage/homePageContent";
import { homeIconMap } from "@/shared/data/mappers/homeIconMap";
import { animStyle, useInView } from "@/shared/hooks/useInView";

interface HomeServicesProps {
  services: IHomeService[];
}

const HomeServices = ({ services }: HomeServicesProps) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: gridRef, inView: gridIn, fromAbove: gridAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <section className="py-16 px-4">
      <h2
        ref={titleRef}
        className="text-2xl font-semibold text-center mb-10 text-(--color-text)"
        style={animStyle(titleIn, titleAbove)}
      >
        What We Build
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
      >
        {services.map((service, i) => (
          <Link
            key={service.name}
            href={service.link}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.08] dark:hover:border-white/20"
            style={animStyle(gridIn, gridAbove, gridIn ? i * 80 : 0)}
          >
            <span className="text-gray-400 dark:text-white/70 transition-colors duration-200">
              {homeIconMap[service.icon]}
            </span>
            <h3 className="font-semibold text-(--color-text)">{service.name}</h3>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
