import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FormState {
  pageSearch: number;
  setPageSearch: (page: number) => void;
  toggleRowCol: (value?: boolean) => void;
  rowCol: boolean;
  pageCatalog: number;
  setPageCatalog: (page: number) => void;
}

const sessionStore = create<FormState>()(
  persist(
    (set) => ({
      rowCol: false,
      pageCatalog: 1,
      pageSearch: 1,
      setPageCatalog: (page: number) => set({ pageCatalog: page }),
      setPageSearch: (page: number) => set({ pageSearch: page }),
      toggleRowCol: (value?: boolean) =>
        set((state) => ({
          rowCol: typeof value === "boolean" ? value : !state.rowCol,
        })),
    }),
    {
      name: "sector-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default sessionStore;
