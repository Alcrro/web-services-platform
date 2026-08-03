import { cn } from "@/lib/utils";
import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}
const Title: FC<ITitleProps> = ({
  children,
  className,
  as: Component = "h1",
  ...props
}) => {
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
};

export default Title;
