import Title from "@/shared/ui/Title";

const TestimonialsTitle = ({ title }: { title: string }) => {
  return (
    <Title
      as={"h2"}
      className="text-3xl font-bold text-center mb-8 text-(--color-text)"
    >
      {title}
    </Title>
  );
};

export default TestimonialsTitle;
