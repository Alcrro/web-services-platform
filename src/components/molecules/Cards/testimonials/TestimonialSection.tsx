import TestimonialCard from "./TestimonialCard";
import SectionTitle from "@/components/atoms/testimonials/SectionTitle";

interface TestimonialsSectionProps {
  title: string;
  reviews: {
    name: string;
    role: string;
    image: string;
    text: string;
  }[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  reviews,
}) => (
  <section>
    <SectionTitle text={title} />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((t) => (
        <TestimonialCard review={t} key={t.name} {...t} />
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
