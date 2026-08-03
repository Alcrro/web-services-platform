"use client";
import { ContactForm as IContactForm } from "@/shared/data/consts/contactPage/contactPageData";
import { useInView } from "@/shared/hooks/useInView";
import { cn } from "@/lib/utils";
import FormVariantsV2 from "../../organisms/FormVariantsV2";

interface ContactFormProps {
  form: IContactForm;
}

const ContactForm = ({ form }: ContactFormProps) => {
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-700",
        inView ? "anim-fade-left" : "opacity-0"
      )}
      style={{
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Gradient accent bar — matches ContactInfo */}
      <div
        className="h-1 w-full shrink-0"
        style={{
          background:
            "linear-gradient(90deg, var(--gradient-hero-from), var(--gradient-hero-to))",
        }}
      />

      <div className="flex-1">
        <FormVariantsV2
          fields={form.fields}
          submitText={form.submitText}
          note={form.note}
          variant="two-columns"
        />
      </div>
    </div>
  );
};

export default ContactForm;
