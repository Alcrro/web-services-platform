// molecules/contact/FormField.tsx
import InputField from "@/components/atoms/form/InputField";
import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";

export default function FormField({ field }: { field: ContactFormField }) {
  return (
    <InputField
      id={field.name}
      label={field.label}
      type={field.type}
      required={field.required}
      options={field.options}
      className="w-full border rounded px-3 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)] placeholder-[var(--color-text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-all duration-200 ease-in-out"
    />
  );
}
