"use client";
import { useModalStore } from "@/context/modalStore";
import { ReactNode, useEffect } from "react";

const ConfiguratorModal = ({ children }: { children: ReactNode }) => {
  const { modals, close } = useModalStore();
  const isOpen = !!modals["configuratorModel"];
  useEffect(() => {
    close("configuratorModel");
  }, [isOpen, close]);

  return <>{children}</>;
};

export default ConfiguratorModal;
