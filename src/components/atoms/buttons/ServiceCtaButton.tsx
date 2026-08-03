import Link from "next/link";

const ServiceCtaButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-8 py-3.5 bg-(--color-bg) text-(--color-accent) text-base font-semibold rounded-xl hover:bg-(--color-bg-section) transition-colors"
    >
      {text}
    </Link>
  );
};

export default ServiceCtaButton;
