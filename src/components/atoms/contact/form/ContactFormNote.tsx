const ContactFormNote: React.FC<{ note: string }> = ({ note }) => (
  <p className="text-sm mt-2 text-(--color-text-secondary) text-center transition-opacity duration-300">
    {note}
  </p>
);

export default ContactFormNote;
