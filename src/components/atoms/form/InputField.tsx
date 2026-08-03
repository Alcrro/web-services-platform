// atoms/contact/InputField.tsx
import { FC } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  className?: string;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  required,
  options,
  className,
}) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={id} className="mb-1 font-medium text-(--color-text)">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          className={`${className} resize-none`}
          required={required}
        />
      ) : type === "select" ? (
        <select id={id} className={className} required={required}>
          <option value="">Selectează</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} type={type} className={className} required={required} />
      )}
    </div>
  );
};

export default InputField;
