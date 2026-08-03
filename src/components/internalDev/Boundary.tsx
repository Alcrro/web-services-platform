"use client";
import { useModalStore } from "@/context/modalStore";
import { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";

const Boundary = ({
  children,
  hydration,
}: {
  children: ReactNode;
  hydration: "client" | "server";
}) => {
  const { modals } = useModalStore((store) => store);
  const containerRef = useRef<HTMLFieldSetElement>(null);
  const isHighlight = modals["internalView"];

  return (
    <>
      {/* Backdrop overlay */}
      {isHighlight &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/20 z-10" />,
          document.body
        )}
      {/* Fieldset container */}
      <fieldset
        ref={containerRef}
        className={`relative p-4 rounded-lg z-20 ${
          isHighlight
            ? "border-4 border-dashed border-blue-600 relative"
            : "border-4 border-transparent"
        }`}
      >
        <legend
          className={`px-2 text-sm font-semibold ${
            isHighlight
              ? "border-4 border-dashed border-blue-600 text-red-600"
              : "border-4 border-transparent"
          }`}
        >
          {isHighlight && `${hydration} component`}
        </legend>

        <div className="">{children}</div>
      </fieldset>
    </>
  );
};

export default Boundary;
