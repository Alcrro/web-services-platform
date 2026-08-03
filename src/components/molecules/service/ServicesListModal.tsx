"use client";
import { ReactNode } from "react";

const ServicesListModal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[280px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-trans scrollbar-track-gray-200">
      {children}
    </div>
  );
};

export default ServicesListModal;
