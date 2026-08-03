import FAQ from "@/components/organisms/home/FAQ";
import ProcessWorkflow from "@/components/organisms/home/ProcessWorkflow";
import HomeHero from "@/components/organisms/home/HomeHero";
import HomeTestimonials from "@/components/organisms/home/HomeTestimonials";
import HomeServices from "@/components/organisms/home/HomeServices";
import HomeAISection from "@/components/organisms/home/HomeAISection";
import HomePortfolio from "@/components/organisms/home/HomePortfolio";
import HomeBenefits from "@/components/organisms/home/HomeBenefits";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { homePageContent } from "@/shared/data/consts/homePage/homePageContent";
import { Metadata } from "next";
import { buildSEO } from "@/lib/seo/seo.utils";
import { homePageSEO } from "@/shared/data/seo/homeSEO";

export const metadata: Metadata = {
  ...buildSEO(homePageSEO),
};

export default function Home() {
  const { faq, hero, process, testimonials, services, portfolio, benefits, aiSection } =
    homePageContent;

  return (
    <DefaultLayout>
      <section id="hero" aria-labelledby="hero-title">
        <HomeHero items={hero} />
      </section>
      <section>
        <HomeServices services={services} />
      </section>
      <section aria-label="AI integration services">
        <HomeAISection aiSection={aiSection} />
      </section>
      <section>
        <ProcessWorkflow process={process} />
      </section>
      <section>
        <HomePortfolio portfolio={portfolio} />
      </section>
      <section>
        {testimonials.reviews.length > 0 ? (
          <HomeTestimonials testimonials={testimonials} />
        ) : (
          <HomeBenefits benefits={benefits} />
        )}
      </section>
      <section>
        <FAQ faq={faq} />
      </section>
    </DefaultLayout>
  );
}
