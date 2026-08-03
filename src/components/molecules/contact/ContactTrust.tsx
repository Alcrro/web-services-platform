"use client";
import { ContactTrust as IContactTrust } from "@/shared/data/consts/contactPage/contactPageData";
import { ShieldCheck } from "lucide-react";
import { useInView } from "@/shared/hooks/useInView";
import { cn } from "@/lib/utils";
import TrustContactCard from "./TrustContactCard";

const ContactTrust = ({ trust }: { trust: IContactTrust }) => {
  const { ref: bannerRef, inView: bannerVisible } = useInView();
  const { ref: cardsRef, inView: cardsVisible } = useInView({ threshold: 0.1 });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Trust message */}
      <div
        ref={bannerRef}
        className={cn(
          "flex items-start gap-3 rounded-xl px-5 py-4 transition-all duration-700",
          bannerVisible ? "anim-fade-up" : "opacity-0"
        )}
        style={{
          background: "var(--color-bg-section)",
          border: "1px solid var(--color-border)",
        }}
      >
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0"
          style={{ color: "var(--color-success)" }}
        />
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {trust.message}
        </p>
      </div>

      {/* Testimonial cards */}
      <div ref={cardsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {trust.testimonials.map((item, i) => (
          <div
            key={item.name}
            className={cn(
              cardsVisible ? "anim-fade-up" : "opacity-0"
            )}
            style={{ animationDelay: cardsVisible ? `${i * 150}ms` : "0ms" }}
          >
            <TrustContactCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactTrust;
