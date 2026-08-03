"use client";
import style from "@/components/styles/servicesCards.module.scss";
import ServiceCard from "./ServiceCard";
import ServicesList from "./ServicesList";
import { IService } from "@/modules/services/domain/types/service.types";
import { animStyle, useInView } from "@/shared/hooks/useInView";
import CardTilt from "@/components/atoms/CardTilt";

export default function ServicesCards({ services }: { services: IService[] }) {
  const { ref, inView, fromAbove } = useInView({ once: false, threshold: 0.04 });

  return (
    <div ref={ref} className={`${style.service_card_container}`}>
      {services.map((service, i) => (
        <div
          key={service.id}
          style={animStyle(inView, fromAbove, inView ? i * 80 : 0)}
        >
          <CardTilt>
            <ServiceCard service={service} href={true}>
              <ServicesList features={service.serviceFeatures} />
            </ServiceCard>
          </CardTilt>
        </div>
      ))}
    </div>
  );
}
