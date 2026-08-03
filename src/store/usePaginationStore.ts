import { create } from "zustand";

interface PaginationState {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  totalPages: 1,
  setPage: (page) => set({ page }),
  setTotalPages: (total) => set({ totalPages: total }),
}));
