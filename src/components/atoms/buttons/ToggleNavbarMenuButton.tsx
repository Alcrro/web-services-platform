"use client";
import style from "@/components/styles/header.module.scss";
import { useModalStore } from "@/context/modalStore";
import { Menu, X } from "lucide-react";

export default function ToggleNavbarMenuButton() {
  const modals = useModalStore((store) => store.modals);
  const toggle = useModalStore((store) => store.toggle);
  const isOpen = !!modals["toggle_navbarMenu"];
  return (
    <button
      className={style["toggle-label"]}
      onClick={() => toggle("toggle_navbarMenu")}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}
