import Link from "next/link";
import { ReactNode } from "react";
import style from "@/components/styles/serviceCard.module.scss";
import ServiceChoseButton from "../../../atoms/buttons/ServiceChoseButton";
import { priceDisplay } from "@/shared/utils/formatServicesPrice";
import { IService, IPriceDisplayModel } from "@/modules/services/domain/types/service.types";
import Boundary from "@/components/internalDev/Boundary";

const displayModelLabel: Record<IPriceDisplayModel, string> = {
  ONE_TIME: "One-time",
  SUBSCRIPTION: "Subscription",
  CONTACT: "Contact",
};

type ServiceCardProps = {
  service: IService;
  children: ReactNode;
  href?: boolean;
};

const ServiceCard = ({ service, children, href }: ServiceCardProps) => {
  const model = service.pricingConfig?.displayModel ?? "ONE_TIME";
  const price = priceDisplay(
    service.pricingConfig?.displayPrice ?? null,
    service.uniqueId
  );

  const CardContent = (
    <div className="flex flex-col h-full p-5 max-[320px]:p-3">
      <span className="inline-block self-start text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
        {displayModelLabel[model]}
      </span>

      <h3 className="text-lg font-bold text-(--color-text) mb-1">
        {service.name}
      </h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {service.description}
      </p>

      <p className="text-2xl font-bold text-(--color-text) mb-4">{price}</p>

      <div className="h-px bg-gray-700/50 mb-4" />

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );

  return (
    <article
      className={`${style.service_card} flex flex-col rounded-2xl border shadow-lg transition-all duration-300 h-full ${
        service.isHighlight
          ? "border-blue-500/60 shadow-blue-500/10 shadow-xl ring-1 ring-blue-500/20"
          : "border-gray-700/50 hover:border-gray-600/70 hover:shadow-xl"
      }`}
    >
      {href ? (
        <Link href={`/services/${service.slug}`} className="flex flex-col flex-1">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}

      <div className="px-5 pb-5 pt-2">
        <Boundary hydration="client">
          <ServiceChoseButton slug={service.slug} />
        </Boundary>
      </div>
    </article>
  );
};

export default ServiceCard;
