import { GET_PRODUCTS } from "@/constants";
import request from "@/services";
import { ProductData } from "@/types";

export const getProducts = async (queryParams: string): Promise<ProductData[]> => {
  try {
    const res = await request.get(`${GET_PRODUCTS}?${queryParams}=true`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
