import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DeliveryRequest, OrderRequest } from "@/types";

export interface CartProduct {
  productId: string;
  count: number;
}

export interface CartState {
  city: string;
  productDetails: CartProduct[];
  total: number;
}

export interface FormState {
  cartForm: CartState | null;
  contactForm: OrderRequest | null;
  deliveryForm: DeliveryRequest | null;
  garanteePrice: number | null;
  selectedGuarantees: Record<string, string>;
  addCartForm: (form: CartState) => void;
  addContactForm: (form: OrderRequest) => void;
  addDeliveryForm: (form: DeliveryRequest) => void;
  addGaranteePrice: (price: number) => void;
  setSelectedGuarantee: (productId: string, guaranteeId: string) => void;
}

const formStore = create<FormState>()(
  persist(
    (set) => ({
      cartForm: null,
      contactForm: null,
      deliveryForm: null,
      garanteePrice: null,
      selectedGuarantees: {},
      addCartForm: (form) => set({ cartForm: form }),
      addContactForm: (form) => set({ contactForm: form }),
      addDeliveryForm: (form) => set({ deliveryForm: form }),
      addGaranteePrice: (price) => set({ garanteePrice: price }),
      setSelectedGuarantee: (productId, guaranteeId) =>
        set((state) => ({
          selectedGuarantees: {
            ...state.selectedGuarantees,
            [productId]: guaranteeId,
          },
        })),
    }),
    {
      name: "sfeo-mtr",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default formStore;
