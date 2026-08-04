"use client";
import { useState } from "react";
import { priceDisplay } from "@/shared/utils/formatServicesPrice";
import type { IService, IPriceDisplayModel } from "@/modules/services/domain/types/service.types";
import ServiceInquiryModal from "./ServiceInquiryModal";

const displayModelLabel: Record<IPriceDisplayModel, string> = {
  ONE_TIME: "One-time payment",
  SUBSCRIPTION: "Subscription",
  CONTACT: "Custom quote",
};

const ServiceDetailPricingCard = ({ service }: { service: IService }) => {
  const [open, setOpen] = useState(false);

  const model = service.pricingConfig?.displayModel ?? "ONE_TIME";
  const price = priceDisplay(service.pricingConfig?.displayPrice ?? null, service.uniqueId);
  const standardCount = service.serviceFeatures.filter((f) => f.type === "STANDARD").length;
  const addonCount = service.serviceFeatures.filter((f) => f.type !== "STANDARD").length;

  return (
    <>
      <div className="sticky top-6 flex flex-col gap-5 p-6 rounded-2xl border border-(--color-border) bg-(--color-bg-section) shadow-sm">
        <div>
          <p className="text-3xl font-extrabold text-(--color-text) tracking-tight">{price}</p>
          <p className="text-sm text-(--color-text-secondary) mt-1">{displayModelLabel[model]}</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Get Started →
        </button>

        <div className="flex flex-col gap-2 pt-2 border-t border-(--color-border)">
          <div className="flex items-center justify-between text-sm">
            <span className="text-(--color-text-secondary)">Included features</span>
            <span className="font-semibold text-(--color-text)">{standardCount}</span>
          </div>
          {addonCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-(--color-text-secondary)">Add-ons available</span>
              <span className="font-semibold text-(--color-accent)">{addonCount}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-(--color-text-secondary)">Support included</span>
            <span className="font-semibold text-green-500">30 days</span>
          </div>
        </div>

        <p className="text-xs text-(--color-text-secondary) text-center leading-relaxed">
          All prices are negotiable based on project scope.
        </p>
      </div>

      {open && (
        <ServiceInquiryModal
          serviceName={service.name}
          serviceSlug={service.slug}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ServiceDetailPricingCard;
