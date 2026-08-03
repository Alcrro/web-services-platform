import { FC } from "react";
import { ContactTestimonial } from "@/shared/data/consts/contactPage/contactPageData";
import { initials } from "@/shared/utils/initials";
import { Quote } from "lucide-react";

interface TrustContactCardProps {
  item: ContactTestimonial;
}

const TrustContactCard: FC<TrustContactCardProps> = ({ item }) => {
  return (
    <div
      className="group relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "var(--color-bg-section)",
        border: "1px solid var(--color-border)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",
        willChange: "transform",
      }}
    >
      {/* Hover glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 16px 48px rgba(37,99,235,0.12), 0 4px 12px rgba(37,99,235,0.08)",
        }}
      />

      {/* Quote icon */}
      <Quote
        className="shrink-0"
        size={20}
        style={{ color: "var(--color-accent)", opacity: 0.7 }}
      />

      {/* Feedback text */}
      <p
        className="flex-1 text-sm leading-relaxed italic"
        style={{ color: "var(--color-text-secondary)" }}
      >
        &ldquo;{item.feedback}&rdquo;
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
        {/* Avatar with gradient ring */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--gradient-hero-from), var(--gradient-hero-to))",
          }}
        >
          {initials(item.name)}
        </div>

        <div className="flex flex-col">
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {item.name}
          </span>
          <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Client
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustContactCard;
