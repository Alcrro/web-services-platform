import ContactLabel from "../../atoms/contact/info/ContactLabel";
import ContactValue from "../../atoms/contact/info/ContactValue";

interface ContactRowProps {
  label: string;
  value: string | number;
}

const ContactRow: React.FC<ContactRowProps> = ({ label, value }) => (
  <>
    <ContactLabel label={label} />
    <ContactValue value={value} />
  </>
);

export default ContactRow;
