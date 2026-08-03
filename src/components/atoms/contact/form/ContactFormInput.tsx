interface FormInputProps {
  id: string;
  type: string;
  className: string;
  required?: boolean;
}

const ContactFormInput: React.FC<FormInputProps> = ({
  id,
  type,
  className,
  required,
}) => (
  <input
    id={id}
    type={type}
    className={className}
    required={required}
    aria-required={required}
  />
);

export default ContactFormInput;
