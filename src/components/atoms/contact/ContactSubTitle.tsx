import Title from "@/shared/ui/Title";

const ContactSubTitle = ({ subTitle }: { subTitle: string }) => {
  return (
    <Title as="p" className="title">
      {subTitle}
    </Title>
  );
};

export default ContactSubTitle;
