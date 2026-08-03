import { create } from "zustand";

interface IErrorsProps {
  errors: Record<string, string | string[]>;
  setErrors: (field: string, message: string | string[]) => void;
  clearError: (uniqueId: string) => void;
  hasError: (uniqueId: string) => boolean;
}
export const useErrorStore = create<IErrorsProps>((set, get) => ({
  errors: {},
  setErrors: (field, error) => {
    set((state) => ({ errors: { ...state.errors, [field]: error } }));
  },
  clearError: (uniqueId) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [uniqueId]: _, ...rest } = state.errors;
      return { errors: rest };
    }),
  hasError: (field) => {
    const errors = get().errors;
    if (errors[field]) return true; // top-level error
    return false;
  },
}));
