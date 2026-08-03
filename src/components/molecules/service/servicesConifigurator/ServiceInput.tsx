import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface IServiceConfigInput {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string | "text";
  required?: boolean;
  className?: string;
  name: string;
  additional?: ReactNode;
}
const ServiceInput: FC<IServiceConfigInput> = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  className,
  name,
  additional,
}) => {
  return (
    <label className="flex flex-col text-sm gap-1">
      <span>
        {label} {required && additional}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("p-2 border rounded " + className)}
        required={required}
        name={name}
      />
    </label>
  );
};

export default ServiceInput;
