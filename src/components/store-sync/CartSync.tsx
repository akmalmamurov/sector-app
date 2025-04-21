"use client";
import { useEffect, useRef } from "react";
import useStore from "@/context/store";
import request from "@/services";
import { TOGGLE_CART } from "@/constants";

export default function CartSync() {
  const auth = useStore((s) => s.auth);
  const cart = useStore((s) => s.cart);
  const resetCart = useStore((s) => s.resetCart);
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (!auth || cart.length === 0 || hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    (async () => {
      try {
        const productIds = cart.map((item) => item.id);

        await Promise.all(
          productIds.map((id) => request.post(TOGGLE_CART, { productId: id }))
        );
        resetCart();
      } catch (error) {
        console.error("Cart sync xatosi:", error);
      }
    })();
  }, [auth, cart, resetCart]);

  return null;
}
