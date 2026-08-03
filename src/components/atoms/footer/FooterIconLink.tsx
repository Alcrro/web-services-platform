import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons/lib";
import style from "@/components/styles/footerIconLink.module.scss";

interface FooterIconLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  name: string;
  Icon: IconType;
  link?: string;
  disabled?: boolean;
}
const FooterIconLink: FC<FooterIconLinkProps> = ({
  name,
  Icon,
  link = "#",
  disabled,
}) => {
  return (
    <Link
      href={disabled ? "#" : link}
      className={`${style.icon_link} p-2 hover:scale-110 transition-transform`}
      data-tooltip={name}
      data-disabled={disabled}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name}`}
    >
      <Icon aria-hidden="true" />
    </Link>
  );
};

export default FooterIconLink;
