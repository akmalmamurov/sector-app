import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductData } from "@/types";

export interface StoreItem extends ProductData {
  quantity?: number;
}

interface StoreState {
  auth: boolean;
  contact: string;
  favorites: StoreItem[];
  cart: StoreItem[];
  compares: StoreItem[];
  setAuth: () => void;
  setContact: (info: string) => void;
  toggleFavorites: (product: ProductData) => void;
  addToCart: (product: ProductData) => void;
  toggleCompare: (product: ProductData) => void;
  setQuantity: (id: number, quantity: number) => void;
  deleteFavorites: (id: number) => void;
  deleteCart: (id: number) => void;
  removeFromCompares: (id: number) => void;
  resetCart: () => void;
  resetFavorites: () => void;
  resetCompares: () => void;
  getTotalPrice: () => number;
  getGroupedItems: () => StoreItem[];
  logOut: () => void;
  clearDataAfterTimeout: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      auth: !!localStorage.getItem("sector-token"),
      contact: "",
      favorites: [],
      cart: [],
      compares: [],
      setAuth: () => set({ auth: true }),
      setContact: (info) => set({ contact: info }),
      toggleFavorites: (product) => {
        set((state) => {
          const isFavorite = state.favorites.some(
            (item) => item.id === product.id
          );
          return isFavorite
            ? {
                favorites: state.favorites.filter(
                  (item) => item.id !== product.id
                ),
              }
            : { favorites: [...state.favorites, product] };
        });
      },
      resetFavorites: () => set({ favorites: [] }),
      addToCart: (product) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            )
            .concat(
              state.cart.some((item) => item.id === product.id)
                ? []
                : [{ ...product, quantity: 1 }]
            ),
        }));
      },
      setQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
          ),
        }));
      },
      toggleCompare: (product) => {
        set((state) => {
          const isCompare = state.compares.some(
            (item) => item.id === product.id
          );
          return isCompare
            ? {
                compares: state.compares.filter(
                  (item) => item.id !== product.id
                ),
              }
            : { compares: [...state.compares, product] };
        });
      },
      deleteFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },
      deleteCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      resetCart: () => set({ cart: [] }),
      removeFromCompares: (id) => {
        set((state) => ({
          compares: state.compares.filter((item) => item.id !== id),
        }));
      },
      resetCompares: () => set({ compares: [] }),
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + (item.price ?? 0) * (item.quantity ?? 1),
          0
        );
      },
      getGroupedItems: () => get().cart,
      logOut: () => {
        set({
          auth: false,
          contact: "",
        });
        localStorage.removeItem("sector_token");
      },
      clearDataAfterTimeout: () => {
        if (!get().auth) {
          setTimeout(() => {
            get().resetCart();
            get().resetFavorites();
            get().resetCompares();
          }, 604800000);
        }
      },
    }),
    {
      name: "sector-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
