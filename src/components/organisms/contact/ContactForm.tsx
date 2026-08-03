// organisms/contact/ContactForm.tsx
import { FC, useState } from "react";
import { ContactFormField } from "@/shared/data/consts/contactPage/contactPageData";
import FormNote from "../../atoms/form/FormNote";
import FormSuccess from "../../atoms/form/FormSuccess";
import FormFieldsGroup from "../../molecules/form/FormFIeldsGroup";
import FormButton from "../../atoms/form/FormButton";
import Title from "@/shared/ui/Title";

interface ContactFormProps {
  fields: ContactFormField[];
  submitText: string;
  note: string;
  variant?: "classic" | "two-columns" | "compact" | "lux";
}

const ContactForm: FC<ContactFormProps> = ({
  fields,
  submitText,
  note,
  variant = "classic",
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className={`py-4 shadow-md rounded-lg ${
        variant === "lux"
          ? "bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white"
          : "bg-(--color-bg-section)"
      }`}
    >
      <Title as={"h2"} className="text-2xl text-center pb-2">
        Send us a message
      </Title>
      <form
        onSubmit={handleSubmit}
        className={`${
          variant === "two-columns"
            ? "max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
            : "max-w-xl mx-auto space-y-4"
        }`}
      >
        <FormFieldsGroup fields={fields} variant={variant} />
        <FormButton
          text={submitText}
          className="w-full py-2 rounded bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition"
        />
        <FormNote note={note} />
        {submitted && <FormSuccess message="Mesaj trimis cu succes!" />}
      </form>
    </div>
  );
};

export default ContactForm;
