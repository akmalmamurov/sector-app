import { StoreItem } from "@/context/store";
import { ProductData } from "@/types";

export const isProductInList = (list: StoreItem[], product: ProductData) => {
  return list.some((item) => item.id === product.id);
};
