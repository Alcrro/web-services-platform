"use client";
import { useModalStore } from "@/context/modalStore";
import { ReactNode } from "react";
import style from "@/components/styles/navbarMenu.module.scss";
const NavbarMenuModal = ({ children }: { children: ReactNode }) => {
  const modals = useModalStore((store) => store.modals);
  const isOpen = !!modals["toggle_navbarMenu"];
  return (
    <ul className={`${style.ul} ${isOpen && style.isOpen}`}>{children}</ul>
  );
};

export default NavbarMenuModal;
