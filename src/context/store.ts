import { ProductData } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface StoreItem extends ProductData {
  quantity?: number;
}

interface StoreState {
  favorites: StoreItem[];
  cart: StoreItem[];
  compares: StoreItem[];
  toggleFavorites: (product: ProductData) => void;
  addToCart: (product: ProductData) => void;
  toggleCompare: (product: ProductData) => void;
  removeFromFavorites: (id: number) => void;
  removeFromCart: (id: number) => void;
  removeFromCompares: (id: number) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: [],
      cart: [],
      compares: [],

      toggleFavorites: (product) => {
        set((state) => {
          const isFavorite = state.favorites.some(
            (item) => item.id === product.id
          );
          if (isFavorite) {
            return {
              favorites: state.favorites.filter((item) => item.id !== product.id),
            };
          } else {
            return { favorites: [...state.favorites, product] };
          }
        });
      },

      addToCart: (product) => {
        set((state) => {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity || 1) + 1 } 
                : item
            ).concat(
              state.cart.some((item) => item.id === product.id) ? [] : [{ ...product, quantity: 1 }] 
            ),
          };
        });
      },

      toggleCompare: (product) => {
        set((state) => {
          const isCompare = state.compares.some(
            (item) => item.id === product.id
          );
          if (isCompare) {
            return {
              compares: state.compares.filter((item) => item.id !== product.id),
            };
          } else {
            return { compares: [...state.compares, product] };
          }
        });
      },

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      removeFromCompares: (id) => {
        set((state) => ({
          compares: state.compares.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "sector-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
