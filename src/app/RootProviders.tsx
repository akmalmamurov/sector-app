"use client";

import { useEffect } from "react";
import useStore, { hydrateStore } from "@/context/store";

export function RootProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateStore();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("sector-token", token);
      useStore.getState().setAuth(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return <>{children}</>;
}
