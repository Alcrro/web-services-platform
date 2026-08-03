"use client";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "disabled" | "neutral" | "ghost";

type ButtonAsButton = {
  href?: undefined; // dacă există, devine Link
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode; // iconiță optională
  loading?: boolean; // arată loader
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// for <Link>
type ButtonAsLink = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({
  href,
  children,
  variant,
  icon,
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle = {
    primary:
      "bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition flex items-center justify-center gap-2",
    secondary:
      "bg-gray-200 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition flex items-center justify-center gap-2",
    outline:
      "bg-transparent border border-(--border) text-[--color-text) px-4 py-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white hover:border-transparent transition flex items-center justify-center gap-2",
    disabled:
      "bg-gray-400 text-gray-200 px-4 py-2 rounded cursor-not-allowed flex items-center justify-center gap-2",
    neutral:
      "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-100 transition flex items-center justify-center gap-2",
    ghost:
      "bg-transparent border border-gray-900/20 text-gray-900 dark:border-white/20 dark:text-white font-medium px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-900/5 dark:hover:bg-white/5 transition flex items-center justify-center gap-2",
  }[variant!];

  const content = (
    <>
      {loading && (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      )}
      {icon && !loading && icon}
      {children}
    </>
  );

  if (typeof href === "string" && href.trim() !== "") {
    return (
      <Link
        href={href}
        className={`${baseStyle} ${className}`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyle} ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default Button;
