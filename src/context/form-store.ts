import { OrderRequest } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export interface CartState {
  city: string;
  products: string[];
  total: number;
}
export interface FormState {
  cartForm: CartState | null;
  contactForm: OrderRequest | null;
  addCartForm: (form: CartState) => void;
  addContactForm: (form: OrderRequest) => void;
}
const formStore = create<FormState>()(
  persist(
    (set) => ({
      cartForm: null,
      contactForm: null,
      addCartForm: (form) => set({ cartForm: form }),
      addContactForm: (form) => set({ contactForm: form }),
    }),
    {
      name: "sfeo-mtr",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default formStore;
