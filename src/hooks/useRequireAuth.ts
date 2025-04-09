"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/context/store";

export function useRequireAuth() {
  const { auth } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.replace("/");
    }
  }, [auth, router]);

  return auth;
}
