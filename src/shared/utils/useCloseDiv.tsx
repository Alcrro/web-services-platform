"use client";
import { RefObject, useEffect } from "react";

interface ICloseDivProps<T extends HTMLElement | null> {
  ref: RefObject<T>;
  state: boolean;
  setState: (value: boolean) => void;
}

export function useCloseDiv<T extends HTMLElement | null>({
  ref,
  state,
  setState,
}: ICloseDivProps<T>) {
  useEffect(() => {
    if (!state) return;
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setState(false);
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [state, ref, setState]);
}

export default useCloseDiv;
