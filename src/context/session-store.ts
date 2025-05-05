import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FormState {
  rowSearch: boolean;
  toggleRowSearch: (value?: boolean) => void;
  pageSearch: number;
  setPageSearch: (page: number) => void;
  toggleRowColProduct: (value?: boolean) => void;
  rowColProduct: boolean;
  pageCatalog: number;
  setPageCatalog: (page: number) => void;
}

const sessionStore = create<FormState>()(
  persist(
    (set) => ({
      rowSearch: false,
      rowColProduct: false,
      pageCatalog: 1,
      pageSearch: 1,
      setPageCatalog: (page: number) => set({ pageCatalog: page }),
      setPageSearch: (page: number) => set({ pageSearch: page }),
      toggleRowSearch: (value?: boolean) =>
        set((state) => ({
          rowSearch: typeof value === "boolean" ? value : !state.rowSearch,
        })),
        toggleRowColProduct: (value?: boolean) =>
        set((state) => ({
            rowColProduct: typeof value === "boolean" ? value : !state.rowColProduct,
        })),
    }),
    {
      name: "sector-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default sessionStore;
