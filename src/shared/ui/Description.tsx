import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, ReactNode } from "react";

type TextElements = "p" | "span" | "small" | "strong" | "label" | "em" | "div";
interface IDescriptionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: TextElements;
}
const Description: FC<IDescriptionProps> = ({
  children,
  className,
  as: Component = "div",
  ...props
}) => {
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
};

export default Description;
