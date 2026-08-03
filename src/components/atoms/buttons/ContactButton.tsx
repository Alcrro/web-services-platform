"use client";
import { FC } from "react";
import Button from "../../../shared/ui/Button";
import { useModalStore } from "@/context/modalStore";

const ContactButton: FC<{ cta: string }> = ({ cta }: { cta: string }) => {
  const setOpen = useModalStore((store) => store.open);

  return (
    <Button
      className="title"
      variant="primary"
      onClick={() => {
        const formEl = document.getElementById("form");
        if (formEl) {
          formEl.scrollIntoView({ behavior: "smooth", block: "start" }); // scroll la top
        }
        setOpen("contactForm");
      }}
    >
      {cta}
    </Button>
  );
};

export default ContactButton;
