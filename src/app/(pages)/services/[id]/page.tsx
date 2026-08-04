export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { servicesSEO } from "@/shared/data/seo/servicesSEO";
import { buildSEO } from "@/lib/seo/seo.utils";
import { SITE_URL } from "@/shared/config/env";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { ServicesAction } from "@/modules/services/application/services.action";
import { getServiceDetailData } from "@/shared/data/consts/servicePage/serviceDetailData";

import ServiceDetailFeatures from "@/components/organisms/service/detail/ServiceDetailFeatures";
import ServiceDetailTechStack from "@/components/organisms/service/detail/ServiceDetailTechStack";
import ServiceDetailProcess from "@/components/organisms/service/detail/ServiceDetailProcess";
import ServiceDetailFAQ from "@/components/organisms/service/detail/ServiceDetailFAQ";
import ServiceDetailTestimonials from "@/components/organisms/service/detail/ServiceDetailTestimonials";
import ServiceDetailPricingCard from "@/components/organisms/service/detail/ServiceDetailPricingCard";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const seo = servicesSEO.find((s) => s.id === id);
  if (!seo) return buildSEO({ title: "Service Not Found", description: "Service not found" });

  return {
    ...buildSEO({
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/services/${id}`,
      image: seo.image,
    }),
    other: { keywords: seo.keywords.join(", ") },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const servicesAction = new ServicesAction();
  const service = await servicesAction.getByIdService(id);

  if (!service) notFound();

  const { faqs } = getServiceDetailData(id);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-16 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-(--color-text-secondary)">
          <Link href="/" className="hover:text-(--color-text) transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-(--color-text) transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-(--color-text) font-medium">{service.name}</span>
        </nav>

        {/* Hero */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-(--color-text) tracking-tight leading-tight">
            {service.name}
          </h1>
          <p className="text-lg text-(--color-text-secondary) leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-12">
            <ServiceDetailFeatures features={service.serviceFeatures} />
            <ServiceDetailTechStack techStack={service.techStack ?? []} />
            <ServiceDetailProcess />
          </div>

          {/* Right column — sticky */}
          <ServiceDetailPricingCard service={service} />
        </div>

        {/* FAQ */}
        <ServiceDetailFAQ faqs={faqs} />

        {/* Testimonials */}
        <ServiceDetailTestimonials />
      </div>
    </DefaultLayout>
  );
}
