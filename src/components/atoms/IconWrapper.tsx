import { LucideIcon, LucideProps } from "lucide-react";

interface IconWrapperProps extends LucideProps {
  icon: LucideIcon;
}

export const IconWrapper = ({
  icon: Icon,
  size = 20,
  className = "",
  ...props
}: IconWrapperProps) => (
  <Icon
    size={size}
    className={`text-gray-500 dark:text-gray-300 ${className}`}
    {...props}
  />
);
