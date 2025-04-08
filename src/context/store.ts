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
  selected: StoreItem[];
  rowCol: boolean;
  user: string | null;
  setUser: (user: string | null) => void;
  setAuth: (value: boolean) => void;
  setContact: (info: string) => void;
  toggleFavorites: (product: ProductData) => void;
  addToCart: (product: ProductData) => void;
  selectedCardsList: (products: ProductData[]) => void;
  toggleCompare: (product: ProductData) => void;
  setQuantity: (id: string, quantity: number) => void;
  deleteFavorites: (id: string) => void;
  deleteCart: (id: string) => void;
  removeFromCompares: (id: string) => void;
  resetCart: () => void;
  resetFavorites: () => void;
  resetCompares: () => void;
  getTotalPrice: () => number;
  getGroupedItems: () => StoreItem[];
  logOut: () => void;
  clearDataAfterTimeout: () => void;
  toggleRowCol: (value?: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      auth: false,
      contact: "",
      favorites: [],
      cart: [],
      rowCol: false,
      compares: [],
      selected: [],
      user: null,
      setUser: (user) => set({ user }),
      setAuth: (value) => set({ auth: value }),
      toggleRowCol: (value?: boolean) =>
        set((state) => ({
          rowCol: typeof value === "boolean" ? value : !state.rowCol,
        })),
      
      selectedCardsList: (products) => {
        set(() => ({
          selected: products,
        }));
      },

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
      addToCart: (product: ProductData) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: (item.quantity || 1) + (product.quantity || 1),
                    }
                  : item
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              { ...product, quantity: product.quantity || 1 },
            ],
          };
        }),
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
        localStorage.removeItem("sector-token");
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

export const hydrateStore = () => {
  useStore.persist.rehydrate();

  if (typeof window !== "undefined" && localStorage.getItem("sector-token")) {
    useStore.setState({ auth: true });
  }
};
