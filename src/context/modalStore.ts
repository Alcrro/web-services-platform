import { create } from "zustand";

type ModalStore = {
  modals: Record<string, boolean>;
  open: (name: string) => void;
  close: (name: string) => void;
  toggle: (name: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  open: (name) =>
    set((state) => ({
      modals: { ...state.modals, [name]: true },
    })),
  close: (name) =>
    set((state) => ({
      modals: { ...state.modals, [name]: false },
    })),
  toggle: (name) =>
    set((state) => ({
      modals: { ...state.modals, [name]: !state.modals[name] },
    })),
}));
