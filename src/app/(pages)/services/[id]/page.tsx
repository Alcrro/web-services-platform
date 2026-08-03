// -------------------- ISR: revalidate --------------------
export const revalidate = 60; // Regenerare la 60 secunde

import ServiceCard from "@/components/molecules/service/card/ServiceCard";
import ServicesList from "@/components/molecules/service/card/ServicesList";

// app/services/[slug]/page.tsx
import { Metadata } from "next";
import { servicesSEO } from "@/shared/data/seo/servicesSEO";
import { buildSEO } from "@/lib/seo/seo.utils";
import { SITE_URL } from "@/shared/config/env";
import DefaultLayout from "@/components/templates/defaultLayout/DefaultLayout";
import { ServicesAction } from "@/modules/services/application/services.action";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const seo = servicesSEO.find((s) => s.id === id);
  if (!seo)
    return buildSEO({
      title: "Service Not Found",
      description: "Service not found",
    });

  return {
    ...buildSEO({
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/services/${id}`,
      image: seo.image,
    }),
    other: {
      keywords: seo.keywords.join(", "),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Find the service
  const servicesAction = new ServicesAction();
  const service = await servicesAction.getByIdService(id);

  if (!service || service.serviceFeatures.length < 1)
    return <p>Service not found</p>;

  return (
    <DefaultLayout>
      <div className="">
        <ServiceCard service={service}>
          <ServicesList features={service.serviceFeatures} />
        </ServiceCard>
      </div>
    </DefaultLayout>
  );
}
