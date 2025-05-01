import { StoreItem } from "@/context/store";
import { ProductData } from "@/types";

export const isProductInList = (list: StoreItem[], product?: ProductData) => {
  if (!product) {
    console.warn("isProductInList: product is undefined or null");
    return false;
  }

  return list.some((item) => item?.id === product.id);
};

