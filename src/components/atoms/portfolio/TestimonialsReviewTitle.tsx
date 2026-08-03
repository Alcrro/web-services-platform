import Title from "@/shared/ui/Title";

const TestimonialsReviewTitle = ({ title }: { title: string }) => {
  return (
    <Title as={"h4"} className="font-semibold text-(--color-text) ">
      {title}
    </Title>
  );
};

export default TestimonialsReviewTitle;
