"use client";
import { FC, useEffect, useState } from "react";
import { useModalStore } from "@/context/modalStore";
import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";
import FormNote from "@/components/atoms/form/FormNote";
import ContactFormFields from "@/components/organisms/contact/ContactFormFields";
import ContactSubmitButton from "@/components/atoms/contact/form/ContactSubmitButton";
import ContactFormTitle from "../atoms/contact/form/ContactFormTitle";

interface ContactFormProps {
  fields: ContactFormField[];
  submitText: string;
  note: string;
  variant?: "classic" | "two-columns" | "compact" | "lux";
}

const FormVariantsV2: FC<ContactFormProps> = ({
  fields,
  submitText,
  note,
  variant = "classic",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const setClose = useModalStore((s) => s.close);
  const modals = useModalStore((s) => s.modals);
  const isOpen = !!modals["contactForm"];

  useEffect(() => {
    function openHandle() {
      if (isOpen) {
        setClose("contactForm");
      }
    }
    const timer = setTimeout(() => openHandle(), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, setClose]);

  const formClass = {
    classic: "max-w-xl mx-auto p-6 rounded-lg shadow-md space-y-4",
    "two-columns":
      "max-w-3xl mx-auto p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4",
    compact: "max-w-lg mx-auto p-5 rounded-lg shadow-lg space-y-3",
    lux: "max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl space-y-5",
  }[variant];

  const formBgClass = {
    classic: "bg-[var(--color-bg-section)] max-w-lg",
    "two-columns": "bg-[var(--color-bg-section)] max-w-3xl mx-auto rounded-lg",
    compact: "bg-[var(--color-bg-section)] max-w-lg",
    lux: "bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-[var(--color-text)]",
  }[variant];

  const inputClass = `
    w-full border rounded px-3 py-2 
    bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)] placeholder-[var(--color-text-secondary)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1
    transition-all duration-200 ease-in-out
    ${variant === "lux" ? "hover:scale-105" : ""}
  `;

  const buttonClass =
    {
      classic: `w-full py-2 rounded transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
      "two-columns": `w-full py-2 rounded transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
      compact: `w-full py-2 rounded-md transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
      lux: `w-full py-3 rounded-lg transition bg-white/20 text-white font-semibold hover:bg-white/40 hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white/80 duration-200 ease-in-out`,
    }[variant] ?? "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className={`${formBgClass} py-4 shadow-md transition duration-500 ${
        isOpen ? "animate-pulse ring-4 ring-blue-400 rounded-xl" : ""
      }`}
    >
      <ContactFormTitle />
      <form className={formClass} onSubmit={handleSubmit}>
        <ContactFormFields
          fields={fields}
          inputClass={inputClass}
          variant={variant}
        />
        <ContactSubmitButton text={submitText} className={buttonClass} />
        <FormNote note={note} />
        {submitted && (
          <p
            className="flex justify-center items-center text-(--color-success) animate-fadeIn text-center"
            role="status"
          >
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default FormVariantsV2;
