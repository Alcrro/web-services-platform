"use client";
import Button from "../../../shared/ui/Button";
import { Printer } from "lucide-react";

const PrintButton = () => {
  return (
    <Button
      className="flex justify-center items-center fixed right-12 bottom-8 bg-[var(--color-bg-section)] opacity-60 hover:animate-pulse hover:opacity-95 text-[var(--color-text)] p-2 rounded-full print:hidden cursor-pointer"
      onClick={() => window.print()}
    >
      <Printer className="max-sm:w-8 max-sm:h-8 max-sm:p-0 w-10 h-10 p-1" />
    </Button>
  );
};

export default PrintButton;
