"use client";
import Button from "@/shared/ui/Button";
import { ReactNode, useRef, useState } from "react";

const ShowMe = ({ children }: { children: ReactNode }) => {
  const [highlight, setHighlight] = useState(false);
  const containerRef = useRef<HTMLFieldSetElement>(null);

  const toggleHighlight = () => {
    setHighlight((prev) => !prev);
  };

  return (
    <>
      <fieldset
        ref={containerRef}
        className={`relative p-4 rounded-lg ${
          highlight ? "border-4 border-dashed border-blue-600" : ""
        }`}
      >
        {highlight && (
          <legend
            className={`px-2 text-sm font-semibold ${
              highlight
                ? "border-4 border-dashed border-blue-600 text-red-600"
                : "text-gray-600"
            }`}
          >
            {children}
          </legend>
        )}
        <div> {children}</div>
      </fieldset>

      <div className="buttons_container fixed bottom-10 right-20">
        <Button
          onClick={toggleHighlight}
          className="bg-(--color-bg) p-2 rounded-lg"
        >
          Toggle Highlight
        </Button>
      </div>
    </>
  );
};

export default ShowMe;
