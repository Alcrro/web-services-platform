"use client";
import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";
import { useModalStore } from "@/context/modalStore";
import { FC, useEffect, useState } from "react";

interface ContactFormProps {
  fields: ContactFormField[];
  submitText: string;
  note: string;
  variant?: "classic" | "two-columns" | "compact" | "lux";
}

const FormVariants: FC<ContactFormProps> = ({
  fields,
  submitText,
  note,
  variant = "classic",
}) => {
  const [submitted, setSubmitted] = useState(false);

  const setClose = useModalStore((store) => store.close);
  const modals = useModalStore((store) => store.modals);

  const isOpen = !!modals["contactForm"];

  const formClass = {
    classic: "max-w-xl mx-auto p-6 rounded-lg shadow-md space-y-4",
    "two-columns":
      "max-w-3xl mx-auto p-6 rounded-lg  grid grid-cols-1 md:grid-cols-2 gap-4",
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

  const buttonClass = {
    classic: `w-full py-2 rounded transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
    "two-columns": `w-full py-2 rounded transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
    compact: `w-full py-2 rounded-md transition bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] duration-200 ease-in-out`,
    lux: `w-full py-3 rounded-lg transition bg-white/20 text-white font-semibold hover:bg-white/40 hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white/80 duration-200 ease-in-out`,
  }[variant];

  const noteClass =
    "text-sm mt-2 text-[var(--color-text-secondary)] transition-opacity duration-300 text-center";

  useEffect(() => {
    // check if URL contains #form
    function openHandle() {
      if (isOpen) {
        setClose("contactForm");
      }
    }
    const timer = setTimeout(() => openHandle, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, setClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // mesaj succes temporar
  };

  return (
    <div
      className={`${formBgClass} py-4 shadow-md transition duration-500 ${
        isOpen ? "animate-pulse ring-4 ring-blue-400 rounded-xl" : ""
      }`}
    >
      <h2 id="contact-form" className="text-2xl text-center pb-2">
        Send as a message
      </h2>
      <form className={`${formClass}`} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              variant === "two-columns"
                ? "flex flex-col col-span-1"
                : "flex flex-col"
            }
          >
            <label
              htmlFor={field.name}
              className="mb-1 font-medium text-(--color-text)"
            >
              {field.label}
              {field.required && (
                <span aria-hidden="true" className="text-red-500">
                  {" "}
                  *
                </span>
              )}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                className={`${inputClass} resize-none`}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                className={inputClass}
                required={field.required}
                aria-required={field.required}
              >
                <option value="">Selectează</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                className={inputClass}
                required={field.type !== "tel" && true}
                aria-required={field.required}
              />
            )}
          </div>
        ))}

        <button type="submit" className={buttonClass}>
          {submitText}
        </button>

        <p className={noteClass}>{note}</p>

        {submitted && (
          <p
            className="text-(--color-success) animate-fadeIn"
            role="status"
            aria-live="polite"
          >
            Mesaj trimis cu succes!
          </p>
        )}
      </form>
    </div>
  );
};

export default FormVariants;
