interface TestimonialTextProps {
  text: string;
}

const TestimonialText: React.FC<TestimonialTextProps> = ({ text }) => (
  <p className={"text-(--color-text-secondary)"}>{text}</p>
);

export default TestimonialText;
