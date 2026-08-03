interface FormSelectProps {
  id: string;
  className: string;
  required?: boolean;
  options: string[];
}

const ContactFormSelect: React.FC<FormSelectProps> = ({
  id,
  className,
  required,
  options,
}) => (
  <select
    id={id}
    className={className}
    required={required}
    aria-required={required}
  >
    <option value="">Select</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default ContactFormSelect;
