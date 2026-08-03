interface FooterTitleProps {
  title: string;
}

const FooterTitle = ({ title }: FooterTitleProps) => (
  <p className="text-sm font-semibold uppercase tracking-widest text-(--color-text-secondary) mb-4">
    {title}
  </p>
);

export default FooterTitle;
