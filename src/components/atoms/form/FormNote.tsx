// atoms/contact/FormNote.tsx
import Description from "@/shared/ui/Description";
import { FC } from "react";

const FormNote: FC<{ note: string }> = ({ note }) => (
  <Description
    as="p"
    className="text-sm text-(--color-text-secondary) text-center"
  >
    {note}
  </Description>
);

export default FormNote;
