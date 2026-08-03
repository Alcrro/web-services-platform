"use client";
import { ContactInfo as IContactInfo } from "@/shared/data/consts/contactPage/contactPageData";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ReactNode } from "react";
import { useInView } from "@/shared/hooks/useInView";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  info: IContactInfo;
}

interface InfoItem {
  icon: ReactNode;
  label: string;
  value: string;
}

const iconClass = "shrink-0 mt-0.5";
const iconStyle = { color: "var(--color-accent)" };

const ContactInfo: React.FC<ContactInfoProps> = ({ info }) => {
  const { ref: wrapperRef, inView: wrapperVisible } = useInView({ threshold: 0.08 });
  const { ref: rowsRef, inView: rowsVisible } = useInView({ threshold: 0.1 });

  const items: InfoItem[] = [
    {
      icon: <Mail size={18} className={iconClass} style={iconStyle} />,
      label: "Email",
      value: info.email,
    },
    {
      icon: <Phone size={18} className={iconClass} style={iconStyle} />,
      label: "Phone",
      value: info.phone,
    },
    {
      icon: <MapPin size={18} className={iconClass} style={iconStyle} />,
      label: "Address",
      value: info.address,
    },
    {
      icon: <Clock size={18} className={iconClass} style={iconStyle} />,
      label: "Working hours",
      value: info.workHours,
    },
  ];

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-700",
        wrapperVisible ? "anim-fade-right" : "opacity-0"
      )}
      style={{
        background: "var(--color-bg-section)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Gradient accent bar */}
      <div
        className="h-1 w-full shrink-0"
        style={{
          background:
            "linear-gradient(90deg, var(--gradient-hero-from), var(--gradient-hero-to))",
        }}
      />

      <div className="flex flex-col gap-1 p-6">
        {/* Header */}
        <h2
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Get in touch
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Reach us through any of these channels.
        </p>

        {/* Info rows */}
        <div ref={rowsRef} className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex items-start gap-3 rounded-xl p-3 transition-colors duration-200",
                rowsVisible ? "anim-fade-up" : "opacity-0"
              )}
              style={{
                background: "var(--color-bg)",
                animationDelay: rowsVisible ? `${i * 80}ms` : "0ms",
              }}
            >
              {/* Icon badge */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                }}
              >
                {item.icon}
              </div>

              <div className="flex flex-col gap-0.5">
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-sm font-medium leading-snug"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
