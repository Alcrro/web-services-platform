import Title from "@/shared/ui/Title";

const ContactTitle = ({ title }: { title: string }) => {
  return (
    <Title as="h1" className="title text-3xl">
      {title}
    </Title>
  );
};

export default ContactTitle;
