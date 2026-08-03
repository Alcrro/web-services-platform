import Description from "@/shared/ui/Description";

const TestimonialsReviewDescription = ({ role }: { role: string }) => {
  return (
    <Description
      as="p"
      className="text-sm text-(--color-text-secondary) md:text-base"
    >
      {role}
    </Description>
  );
};

export default TestimonialsReviewDescription;
