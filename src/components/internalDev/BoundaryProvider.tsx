"use client";
import { useModalStore } from "@/context/modalStore";
import Button from "@/shared/ui/Button";
import { ReactNode } from "react";

const BoundaryProvider = ({ children }: { children: ReactNode }) => {
  const { toggle } = useModalStore((store) => store);
  return (
    <>
      {children}
      <div className="buttons_container fixed bottom-10 right-20 z-30">
        <Button
          onClick={() => toggle("internalView")}
          className="bg-(--color-bg) p-2 rounded-lg"
        >
          Toggle Highlight
        </Button>
      </div>
    </>
  );
};

export default BoundaryProvider;
