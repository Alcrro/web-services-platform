import TestimonialAvatar from "@/components/atoms/testimonials/TestimonialAvatar";
import TestimonialText from "@/components/atoms/testimonials/TestimonialText";
import Description from "@/shared/ui/Description";
import Title from "@/shared/ui/Title";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  image,
  text,
}) => (
  <div className="benefit-card p-6 rounded-xl shadow-lg hover:shadow-xl transition">
    <div className="flex items-center gap-4 mb-4">
      <TestimonialAvatar image={image} name={name} />
      <div>
        <Title as="h4" className="font-semibold text-(--color-text)">
          {name}
        </Title>
        <Description
          as="span"
          className="text-sm text-(--color-text-secondary)"
        >
          {role}
        </Description>
      </div>
    </div>
    <TestimonialText text={text} />
  </div>
);

export default TestimonialCard;
