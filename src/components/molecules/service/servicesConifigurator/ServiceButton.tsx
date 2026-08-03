import { FC, ReactNode } from "react";
import Button from "../../../../shared/ui/Button";

interface IServiceConfigBtn {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const ServiceButton: FC<IServiceConfigBtn> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <Button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
      {children}
    </Button>
  );
};

export default ServiceButton;
