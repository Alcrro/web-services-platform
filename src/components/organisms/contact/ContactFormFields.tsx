import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";
import ContactFormLabel from "../../atoms/contact/form/ContactFormLabel";
import ContactFormTextarea from "../../atoms/contact/form/ContactFormTextarea";
import ContactFormSelect from "../../atoms/contact/form/ContactFormSelect";
import ContactFormInput from "../../atoms/contact/form/ContactFormInput";

interface ContactFormFieldsProps {
  fields: ContactFormField[];
  inputClass: string;
  variant: string;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  fields,
  inputClass,
  variant,
}) => (
  <>
    {fields.map((field) => (
      <div
        key={field.name}
        className={
          variant === "two-columns"
            ? "flex flex-col col-span-1"
            : "flex flex-col"
        }
      >
        <ContactFormLabel
          htmlFor={field.name}
          text={field.label}
          required={field.required}
        />

        {field.type === "textarea" ? (
          <ContactFormTextarea id={field.name} className={inputClass} />
        ) : field.type === "select" ? (
          <ContactFormSelect
            id={field.name}
            className={inputClass}
            required={field.required}
            options={field.options || []}
          />
        ) : (
          <ContactFormInput
            id={field.name}
            type={field.type}
            className={inputClass}
            required={field.type !== "tel"}
          />
        )}
      </div>
    ))}
  </>
);

export default ContactFormFields;
