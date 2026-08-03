"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useCallback } from "react";
import style from "@/components/styles/servCardModal.module.scss";
import { useModalStore } from "@/context/modalStore";
import { services } from "@/shared/data/consts/cardServices/cardServicesData";

const ServiceModal = ({ children }: { children: ReactNode }) => {
  const { modals, close, open } = useModalStore();
  const isOpen = !!modals["configuratorModel"];
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const currentSlug = pathname.split("/").pop() ?? "";
  const pathExist = services.some((service) => service.slug === currentSlug);

  const closeModal = useCallback(() => {
    close("configuratorModel");

    if (pathExist) {
      setTimeout(() => router.back(), 300); // match CSS transition
    }
  }, [close, router, pathExist]);

  useEffect(() => {
    if (pathExist) {
      open("configuratorModel");
    }
  }, [pathExist, open]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center
      ${style.modal_backdrop} ${isOpen ? style.modal_backdrop_show : ""}`}
      ref={ref}
      onClick={closeModal}
    >
      <div
        className={`block bg-(--color-bg-section) rounded-2xl p-4 relative
        ${style.modal_content} ${isOpen ? style.modal_content_show : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ServiceModal;
