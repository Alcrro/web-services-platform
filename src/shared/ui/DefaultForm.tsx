import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, ReactNode } from "react";

interface IDefaultFormProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className: string;
}
const DefaultForm: FC<IDefaultFormProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form className={cn(className)} {...props}>
      {children}
    </form>
  );
};

export default DefaultForm;
