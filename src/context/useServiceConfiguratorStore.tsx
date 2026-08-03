import { ContactInfo } from "@/modules/auth/domain/auth.types";
import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { create } from "zustand";

type ConfiguratorState = {
  step: number;
  contactInfo: ContactInfo;
  selectedOptions: IServiceFeature[];
  includedOptions: IServiceFeature[];
  setIncludedOptions: (feature: IServiceFeature[]) => void;
  quantity: number;
  setSelectedOptions: (options: IServiceFeature[]) => void;
  setStep: (step: number) => void;
  setContactInfo: (info: Partial<ContactInfo>) => void;
  toggleOption: (id: string, feature: IServiceFeature) => void;
  setQuantity: (qty: number) => void;
};
export const useServiceConfiguratorStore = create<ConfiguratorState>((set) => ({
  step: 0,
  contactInfo: { name: null, email: null, phone: undefined },
  selectedOptions: [],
  includedOptions: [],
  quantity: 1,
  setStep: (step) => set({ step }),
  setContactInfo: (info) =>
    set((state) => ({ contactInfo: { ...state.contactInfo, ...info } })),
  toggleOption: (id, feature) =>
    set((state) => {
      const exists = state.selectedOptions.find((f) => f.id === id);

      const updatedOptions = exists
        ? state.selectedOptions.filter((f) => f.id !== id)
        : [...state.selectedOptions, feature];

      return { selectedOptions: updatedOptions };
    }),
  setIncludedOptions: (data) =>
    set({
      includedOptions: [...data],
    }),
  setSelectedOptions: (options) => set({ selectedOptions: options }),

  setQuantity: (qty) => set({ quantity: Math.max(1, Math.round(qty)) }),
}));
