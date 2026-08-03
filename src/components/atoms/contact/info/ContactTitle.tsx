"use client";

interface ContactTitleProps {
  title: string;
}

const ContactTitle: React.FC<ContactTitleProps> = ({ title }) => (
  <h3 id="contact-info-title" className="text-2xl font-bold">
    {title}
  </h3>
);

export default ContactTitle;
