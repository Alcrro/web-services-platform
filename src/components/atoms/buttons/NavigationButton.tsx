import { cn } from "@/lib/utils";
import Button from "@/shared/ui/Button";
import { FC, ReactNode } from "react";

interface INavigationBtnProps {
  variant?: string;
  isDisabled: boolean;
  handleMove: () => void;
  className: string;
  children: ReactNode;
}
const NavigationButton: FC<INavigationBtnProps> = ({
  variant,
  isDisabled,
  handleMove,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={`${variant && cn(variant)} ${cn(className)} }`}
      disabled={isDisabled}
      onClick={handleMove}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavigationButton;
