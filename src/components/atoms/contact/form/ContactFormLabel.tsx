interface FormLabelProps {
  htmlFor: string;
  text: string;
  required?: boolean;
}
const ContactFormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  text,
  required,
}) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 font-medium text-(--color-text)">
      {text}
      {required && (
        <span aria-hidden="true" className="text-red-500">
          {" "}
          *
        </span>
      )}
    </label>
  );
};

export default ContactFormLabel;
