interface FormTextareaProps {
  id: string;
  className: string;
}

const ContactFormTextarea: React.FC<FormTextareaProps> = ({
  id,
  className,
}) => <textarea id={id} className={`${className} resize-none`} />;

export default ContactFormTextarea;
