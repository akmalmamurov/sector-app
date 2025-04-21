"use client";
import { useState, useEffect, useRef } from "react";
import { showError } from "@/components/toast/Toast";
import useStore from "@/context/store";
import { ProductData } from "@/types";

export function useCartPage(initialCart: ProductData[]) {
  const [isClient, setIsClient] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(() =>
    initialCart?.map((item) => item.id)
  );
  const [prevCartLength, setPrevCartLength] = useState(initialCart?.length);

  const { auth, clearDataAfterTimeout } = useStore();
  const authErrorShown = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (auth === false) {
      clearDataAfterTimeout();
    }
  }, [auth, clearDataAfterTimeout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth === false && !authErrorShown.current) {
        showError("Вы не авторизованы, рекомендуем авторизоваться");
        authErrorShown.current = true;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [auth]);

  useEffect(() => {
    if (initialCart?.length !== prevCartLength) {
      setSelectedItems(initialCart?.map((i) => i.id));
      setPrevCartLength(initialCart?.length);
    }
  }, [initialCart, prevCartLength]);

  const toggleAllItems = () => {
    setSelectedItems((prev) =>
      prev?.length === initialCart?.length ? [] : initialCart?.map((i) => i.id)
    );
  };

  const toggleSingleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev?.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllChecked =
    initialCart?.length > 0 && selectedItems?.length === initialCart?.length;

  const selectedCards = initialCart?.filter((item) =>
    selectedItems?.includes(item.id)
  );

  return {
    isClient,
    selectedItems,
    toggleAllItems,
    toggleSingleItem,
    isAllChecked,
    selectedCards,
  } as const;
}
