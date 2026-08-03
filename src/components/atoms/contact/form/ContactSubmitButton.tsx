interface SubmitButtonProps {
  text: string;
  className: string;
}

const ContactSubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  className,
}) => (
  <button type="submit" className={className}>
    {text}
  </button>
);

export default ContactSubmitButton;
