import Link from "next/link";

interface FooterLinkProps {
  name: string;
  link?: string;
}

const FooterLink = ({ name, link = "#" }: FooterLinkProps) => (
  <Link
    href={link}
    className="text-base text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
  >
    {name}
  </Link>
);

export default FooterLink;
