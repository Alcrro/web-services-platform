// molecules/contact/FormFieldsGroup.tsx
import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";
import FormField from "./FormField";

export default function FormFieldsGroup({
  fields,
  variant,
}: {
  fields: ContactFormField[];
  variant?: string;
}) {
  const className =
    variant === "two-columns"
      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
      : "space-y-4";
  return (
    <div className={className}>
      {fields.map((field) => (
        <FormField key={field.name} field={field} />
      ))}
    </div>
  );
}
