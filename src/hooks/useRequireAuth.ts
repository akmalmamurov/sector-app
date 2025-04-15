"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/context/store";

export function useRequireAuth() {
  const { auth, isHydrated } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return; 

    if (!auth) {
      router.replace("/");
    }
  }, [auth, isHydrated, router]);

  return auth;
}
