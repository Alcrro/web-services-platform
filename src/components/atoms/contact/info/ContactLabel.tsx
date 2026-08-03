interface ContactLabelProps {
  label: string;
}

const ContactLabel: React.FC<ContactLabelProps> = ({ label }) => (
  <div className="min-[420px]:text-right font-semibold min-[420px]:pr-4">
    {label}:
  </div>
);

export default ContactLabel;
