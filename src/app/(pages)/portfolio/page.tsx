import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { portfolioSEO } from "@/shared/data/seo/portfolioSEO";
import { Metadata } from "next";
import PortfolioCta from "@/components/molecules/portfolio/PortfolioCta";
import PortfolioProjectsClient from "@/components/molecules/portfolio/PortfolioProjectsClient";
import HeroSection from "@/components/organisms/portfolio/HeroSection";
import { portfolioPageContent } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import { buildSEO } from "@/lib/seo/seo.utils";
import dynamic from "next/dynamic";

const Testimonials = dynamic(
  () => import("@/components/organisms/portfolio/TestimonialsSection"),
  { ssr: true }
);

export async function generateMetadata(): Promise<Metadata> {
  return buildSEO(portfolioSEO);
}

const Portfolio = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const searchP = await searchParams;
  const searchParamsValue = Object.values(searchP)[0];

  const { hero, projects, filters, testimonials, cta } = portfolioPageContent;

  const filteredProjects =
    searchParamsValue === undefined || searchParamsValue === "all"
      ? projects
      : projects.filter((p) => p.category === searchParamsValue);

  return (
    <DefaultLayout>
      <main className="space-y-24 mx-auto">
        {/* Hero */}
        <section className="relative text-center py-24 md:py-32 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-(--color-accent) opacity-[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-40 w-96 h-96 rounded-full bg-(--gradient-hero-to) opacity-[0.07] blur-3xl" />
          <div className="relative space-y-6">
            <HeroSection {...hero} />
          </div>
        </section>

        {/* Filters + Projects Grid */}
        <section aria-label="Portfolio Projects">
          <PortfolioProjectsClient
            projects={filteredProjects}
            filters={filters}
            activeFilter={searchParamsValue}
          />
        </section>

        {/* Testimonials */}
        {testimonials && (
          <section aria-label="Testimonials">
            <Testimonials testimonials={testimonials} />
          </section>
        )}

        {/* CTA */}
        <section
          className="relative text-center py-20 px-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-(--color-accent) to-(--color-accent-deep)"
          aria-label="Call to Action"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
          <div className="relative space-y-2">
            <PortfolioCta
              buttonHref={cta.button.href}
              buttonText={cta.button.text}
              title={cta.title}
            />
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Portfolio;
