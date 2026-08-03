"use client";

import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import ServiceInput from "./ServiceInput";
import { useErrorStore } from "@/context/useErrorStore";

export const ServiceConfiguratorContactForm = () => {
  const contactInfo = useServiceConfiguratorStore((s) => s.contactInfo);
  const setContactInfo = useServiceConfiguratorStore((s) => s.setContactInfo);
  const { hasError } = useErrorStore((s) => s);

  return (
    <div className="space-y-4">
      <ServiceInput
        label="Full Name"
        value={contactInfo.name || ""}
        name="name"
        required={true}
        onChange={(v) => setContactInfo({ name: v })}
        className={hasError("name") ? "border-red-500" : ""}
        additional={<span className="text-red-500">*</span>}
      />
      <ServiceInput
        label="Email"
        type="email"
        name="email"
        value={contactInfo.email || ""}
        onChange={(v) => setContactInfo({ email: v })}
        required={true}
        className={hasError("email") ? "border-red-500" : ""}
        additional={<span className="text-red-500">*</span>}
      />
      <ServiceInput
        label="Phone"
        type="tel"
        name="phone"
        value={contactInfo.phone?.toString() || ""}
        onChange={(v) => setContactInfo({ phone: v })}
      />
    </div>
  );
};
