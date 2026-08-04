import Link from "next/link";
import { ReactNode } from "react";
import ServiceChoseButton from "../../../atoms/buttons/ServiceChoseButton";
import { priceDisplay } from "@/shared/utils/formatServicesPrice";
import { IService, IPriceDisplayModel } from "@/modules/services/domain/types/service.types";
import Boundary from "@/components/internalDev/Boundary";
import { Star } from "lucide-react";

const displayModelLabel: Record<IPriceDisplayModel, string> = {
  ONE_TIME: "One-time",
  SUBSCRIPTION: "Subscription",
  CONTACT: "Contact us",
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
  const isHighlight = service.isHighlight;

  const inner = (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-5">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
            isHighlight
              ? "bg-(--color-accent)/10 text-(--color-accent) border-(--color-accent)/20"
              : "bg-(--color-bg-hover) text-(--color-text-secondary) border-(--color-border)"
          }`}
        >
          {displayModelLabel[model]}
        </span>
        {isHighlight && (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-(--color-accent)">
            <Star className="w-3 h-3 fill-(--color-accent)" />
            Popular
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-(--color-text) leading-tight mb-1.5">
        {service.name}
      </h3>
      <p className="text-sm text-(--color-text-secondary) line-clamp-2 mb-5">
        {service.description}
      </p>

      <p className="text-3xl font-extrabold text-(--color-text) tracking-tight mb-5">
        {price}
      </p>

      <div className="h-px bg-(--color-border) mb-4" />

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );

  return (
    <article
      className={`flex flex-col rounded-2xl border transition-all duration-300 h-full max-h-[800px] bg-(--color-bg-section) ${
        isHighlight
          ? "border-(--color-accent)/40 shadow-lg ring-1 ring-(--color-accent)/20"
          : "border-(--color-border) hover:shadow-md"
      }`}
    >
      <div className="flex-1 min-h-0">
        {href ? (
          <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
            {inner}
          </Link>
        ) : (
          inner
        )}
      </div>

      <div className="px-6 pb-6 pt-2">
        <Boundary hydration="client">
          <ServiceChoseButton slug={service.slug} />
        </Boundary>
      </div>
    </article>
  );
};

export default ServiceCard;
