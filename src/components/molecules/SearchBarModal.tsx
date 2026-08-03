"use client";
import { useModalStore } from "@/context/modalStore";
import Button from "@/shared/ui/Button";
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";

const SearchBarModal = ({ children }: { children: ReactNode }) => {
  const close = useModalStore((store) => store.close);
  const modals = useModalStore((store) => store.modals);
  const isOpen = !!modals["searchBar"];
  return (
    <div
      className={`
          absolute top-0 left-1/2 transform -translate-x-1/2 
          max-md:top-[60px] max-md:w-[90%] md:relative md:flex md:items-center
          bg-(--color-bg-section) rounded 
          overflow-hidden transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "opacity-100 max-md:translate-y-0 md:w-94 z-10"
              : "opacity-100  max-md:-translate-y-4 md:w-4"
          }
        `}
    >
      {/* Icon + input */}
      {isOpen && (
        <div className="flex items-center w-full px-2 max-md:py-2">
          {children}
          <Button
            onClick={() => close("searchBar")}
            className="ml-2 p-1 rounded hover:bg-gray-300 hover:text-black transition "
          >
            <CgClose size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBarModal;
