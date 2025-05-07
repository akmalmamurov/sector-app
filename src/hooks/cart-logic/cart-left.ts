"use client";

import { useEffect } from "react";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import type { StoreItem } from "@/context/store";
import type { UseFormSetValue } from "react-hook-form";
import type { OrderRequest, ProductDetails } from "@/types";
import type { CartState } from "@/context/form-store";
import formStore from "@/context/form-store";

interface Params {
  cart: StoreItem[];
  selectedItems: string[];
  setValue: UseFormSetValue<OrderRequest>;
  cartForm: CartState | null;
  resetCart: () => void;
  deleteCart: (id: string) => void;
}

export function useCartLeft({
  cart,
  selectedItems,
  setValue,
  cartForm,
  resetCart,
  deleteCart,
}: Params) {
  const selectedGuarantees = formStore((s) => s.selectedGuarantees);
  useEffect(() => {
    if (cartForm?.city) {
      setValue("city", cartForm.city);
    }
  }, [cartForm?.city, setValue]);

  useEffect(() => {
    const selectedProducts = cart.filter(item =>
      selectedItems.includes(item.id)
    );
  
    const total = selectedProducts.reduce(
      (sum, item) => sum + (item.price ) * (item.count || 1),
      0
    );
  
    const details: ProductDetails[] = selectedProducts.map(item => ({
      productId: item.id,
      count: item.count ?? 0,
      garanteeId: selectedGuarantees[item.id] ?? "0",
    }));
  
    setValue("productDetails", details);
    setValue("total", total);
  }, [selectedItems, cart, setValue, selectedGuarantees]);
  

  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleDeleteAll = () => {
    openModal("Вы уверены, что хотите удалить все товары из корзины?", () =>
      resetCart()
    );
  };

  const handleDeleteClick = (id: string) => {
    openModal("Вы уверены, что хотите удалить товар из корзины?", () =>
      deleteCart(id)
    );
  };

  return {
    isConfirmOpen,
    message,
    onConfirm,
    closeModal,
    handleDeleteAll,
    handleDeleteClick,
  } as const;
}
