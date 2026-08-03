import { InputHTMLAttributes } from "react";

interface IDefaultFormLabel extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  name: string;
  error?: string;
}

const DefaultFormLabel: React.FC<IDefaultFormLabel> = ({
  htmlFor,
  label,
  name,
  error,
  ...inputProps
}: IDefaultFormLabel) => {
  return (
    <div className="form_group flex flex-col gap-2">
      <label htmlFor={htmlFor} className="form_label">
        {label}
      </label>
      <input id={htmlFor} name={name} {...inputProps} />
      {error && <p className="form_error">{error}</p>}
    </div>
  );
};

export default DefaultFormLabel;
