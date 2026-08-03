import Link from "next/link";

const PortfolioCtaBtn = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-base bg-white text-(--color-accent) hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
    >
      {text}
    </Link>
  );
};

export default PortfolioCtaBtn;
