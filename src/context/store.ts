import { ProductData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreItem {
  product: ProductData;
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
            (item) => item.product.id === product.id
          );
          if (isFavorite) {
            return {
              favorites: state.favorites.filter(
                (item) => item.product.id !== product.id
              ),
            };
          } else {
            return { favorites: [...state.favorites, { product }] };
          }
        });
      },

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { product, quantity: 1 }] };
          }
        });
      },

      toggleCompare: (product) => {
        set((state) => {
          const isCompare = state.compares.some(
            (item) => item.product.id === product.id
          );
          if (isCompare) {
            return {
              compares: state.compares.filter(
                (item) => item.product.id !== product.id
              ),
            };
          } else {
            return { compares: [...state.compares, { product }] }; 
          }
        });
      },
      

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.product.id !== id),
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== id),
        }));
      },

      removeFromCompares: (id) => {
        set((state) => ({
          compares: state.compares.filter((item) => item.product.id !== id),
        }));
      },
    }),
    {
      name: "store-storage", // localStorage nomi
    }
  )
);

export default useStore;
