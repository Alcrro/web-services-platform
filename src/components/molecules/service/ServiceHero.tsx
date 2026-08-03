"use client";

import { ServiceHeroSection } from "@/shared/data/consts/servicePage/servicePageContent";
import ServiceCtaHeroBtn from "../../atoms/buttons/ServiceCtaHeroBtn";
import { useInView } from "@/shared/hooks/useInView";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Fragment, CSSProperties } from "react";

const STATS = [
  { value: "20+", label: "Projects" },
  { value: "48h", label: "First Delivery" },
  { value: "100%", label: "Satisfaction" },
];

const TAGS = ["Fast Delivery", "SEO-Optimized", "Full Support"];

const slide = (inView: boolean, delay: number): CSSProperties => ({
  opacity: inView ? 1 : 0,
  transform: `translateY(${inView ? 0 : 28}px)`,
  transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
});

const ServiceHero = ({ hero }: { hero: ServiceHeroSection }) => {
  const { ref, inView } = useInView({ once: false, threshold: 0.05 });

  return (
    <div ref={ref} className="relative isolate py-24 flex flex-col items-center gap-8">
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow blobs */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div className="hero-blob-main absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full blur-[80px] opacity-50" />
        <div className="hero-blob-secondary absolute top-1/3 left-0 w-70 h-70 rounded-full blur-[60px] opacity-40" />
        <div className="hero-blob-tertiary absolute top-1/4 right-0 w-60 h-60 rounded-full blur-[60px] opacity-40" />
      </div>

      {/* Badge */}
      <span
        style={slide(inView, 0)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-(--color-accent)/10 text-(--color-accent) border border-(--color-accent)/25"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse" />
        Web Development Services
      </span>

      {/* Heading */}
      <div style={slide(inView, 100)} className="flex flex-col items-center gap-1">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight text-(--color-text) leading-[1.1]">
          {hero.title}
        </h1>
        <span className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.2] text-gradient-hero">
          Built to Last.
        </span>
      </div>

      {/* Subtitle */}
      <p style={slide(inView, 200)} className="max-w-lg text-base text-(--color-text-secondary) leading-relaxed">
        {hero.subtitle}
      </p>

      {/* CTAs */}
      <div style={slide(inView, 300)} className="flex items-center gap-4 flex-wrap justify-center">
        <ServiceCtaHeroBtn hero={hero.cta} />
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-(--color-border) text-(--color-text) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
        >
          See my work <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Trust tags */}
      <div style={slide(inView, 400)} className="flex items-center gap-2.5 text-xs text-(--color-text-secondary)">
        {TAGS.map((tag, i) => (
          <Fragment key={tag}>
            {i > 0 && <span className="w-1 h-1 rounded-full bg-(--color-border)" />}
            <span>{tag}</span>
          </Fragment>
        ))}
      </div>

      {/* Stats */}
      <div
        style={slide(inView, 500)}
        className="w-full max-w-xs pt-6 border-t border-(--color-border) flex items-center justify-between"
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-gradient-hero">
              {value}
            </span>
            <span className="text-xs text-(--color-text-secondary)">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHero;
