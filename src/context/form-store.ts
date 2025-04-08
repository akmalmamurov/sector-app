import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface CartState {
  city: string;
  products: string[];
  total: number;
}
interface FormState {
  cartForm: CartState | null;
  addCartForm: (form: CartState) => void;
}
const formStore = create<FormState>()(
  persist(
    (set) => ({
      cartForm: null,
      addCartForm: (form) => set({ cartForm: form }),
    }),
    {
      name: "sfeo-mtr",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default formStore;
