"use client";
import { useModalStore } from "@/context/modalStore";
import { ReactNode } from "react";

const IconSearchNavbar = ({ children }: { children: ReactNode }) => {
  const open = useModalStore((store) => store.open);
  const modals = useModalStore((store) => store.modals);
  const isOpen = !!modals["searchBar"];
  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => open("searchBar")}
          className="flex items-center justify-center p-2 cursor-pointer"
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default IconSearchNavbar;
