"use client";
import { useEffect, useRef } from "react";
import useStore from "@/context/store";
import request from "@/services";
import { TOGGLE_CART, TOGGLE_FAVORITES } from "@/constants";

export default function SyncAll() {
  const auth = useStore((s) => s.auth);
  const cart = useStore((s) => s.cart);
  const saved = useStore((s) => s.favorites); // favorites
  const resetCart = useStore((s) => s.resetCart);
  const resetSaved = useStore((s) => s.resetFavorites);
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (
      !auth ||
      hasSyncedRef.current ||
      (cart.length === 0 && saved.length === 0)
    ) {
      return;
    }
    hasSyncedRef.current = true;

    (async () => {
      try {
        const cartIds = cart.map((item) => item.id);
        await Promise.all(
          cartIds.map((id) => request.post(TOGGLE_CART, { productId: id }))
        );
        resetCart();
        const savedIds = saved.map((item) => item.id);
        await Promise.all(
          savedIds.map((id) =>
            request.post(TOGGLE_FAVORITES, { productId: id })
          )
        );
        resetSaved();
      } catch (error) {
        console.error("Sync xatosi:", error);
      }
    })();
  }, [auth, cart, saved, resetCart, resetSaved]);

  return null;
}
