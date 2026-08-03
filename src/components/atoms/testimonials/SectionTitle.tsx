interface SectionTitleProps {
  text: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => (
  <h2 className="text-3xl font-bold text-center mb-8 text-(--color-text)">
    {text}
  </h2>
);

export default SectionTitle;
