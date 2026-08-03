"use client";
import { useModalStore } from "@/context/modalStore";
import { ReactNode } from "react";
import style from "@/components/styles/header.module.scss";
const NavModal = ({ children }: { children: ReactNode }) => {
  const modals = useModalStore((store) => store.modals);
  const isOpen = !!modals["toggle_navbarMenu"];
  return (
    <nav
      className={`${style.nav} ${
        isOpen && style.isOpen
      } flex justify-between p-4 items-center max-[320px]:flex-col max-sm:gap-2`}
    >
      {children}
    </nav>
  );
};

export default NavModal;
