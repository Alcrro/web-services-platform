"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import style from "@/components/styles/navLink.module.scss";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname(); // URL-ul curent

  // Extract once, clearer logic
  const currentSegment = pathname.split("/")[1] ?? "";
  const menuSegment = href.split("/")[1] ?? "";
  const isActive = currentSegment === menuSegment;

  return (
    <Link
      href={href}
      className={`${style.a} ${isActive ? style.isActive : ""} capitalize`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
