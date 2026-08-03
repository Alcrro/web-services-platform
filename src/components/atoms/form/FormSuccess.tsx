// atoms/contact/FormSuccess.tsx
import Description from "@/shared/ui/Description";
import { FC } from "react";

const FormSuccess: FC<{ message: string }> = ({ message }) => (
  <Description
    as="p"
    className="text-(--color-success) animate-fadeIn"
    role="status"
    aria-live="polite"
  >
    {message}
  </Description>
);

export default FormSuccess;
