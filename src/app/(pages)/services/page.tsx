// export const revalidate = 86400;
export const dynamic = "force-dynamic";
import ServiceCta from "@/components/molecules/service/ServiceCta";
import ServiceFaq from "@/components/molecules/service/ServiceFaq";
import ServiceHero from "@/components/molecules/service/ServiceHero";
import ServiceProcess from "@/components/molecules/service/ServiceProcess";
import ServicesBenefits from "@/components/molecules/service/card/ServicesBenefits";
import { servicesPageContent } from "@/shared/data/consts/servicePage/servicePageContent";
import ServicesList from "@/components/organisms/ServicesList";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { Suspense } from "react";
import { Metadata } from "next";
import { buildSEO } from "@/lib/seo/seo.utils";
import { servicesListingPageSEO } from "@/shared/data/seo/servicesSEO";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";

export async function generateMetadata(): Promise<Metadata> {
  return buildSEO(servicesListingPageSEO);
}

export default function ServicesPage() {
  const { hero, faq, benefits, process, cta } = servicesPageContent;

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-16">
        <section aria-labelledby="services-heading" className="text-center">
          <ServiceHero hero={hero} />
        </section>

        <Suspense fallback={<ServiceCardSkeleton />}>
          <ServicesList />
        </Suspense>

        <section className="px-8 py-12 rounded-2xl bg-(--color-bg-section)">
          <ServicesBenefits benefits={benefits} />
        </section>

        <section aria-label="Our Process" className="py-4">
          <ServiceProcess process={process} />
        </section>

        <section aria-label="Frequently Asked Questions" className="py-4">
          <ServiceFaq faq={faq} />
        </section>

        <section
          className="text-center py-20 rounded-3xl bg-(--color-accent)"
          aria-label="Call to Action"
        >
          <ServiceCta cta={cta} />
        </section>
      </div>
    </DefaultLayout>
  );
}
