import { GET_PRODUCTS } from "@/constants";
import request from "@/services";
import { ProductData } from "@/types";

export const getProducts = async (queryParams: Record<string, string>): Promise<ProductData[]> => {
  try {
    const res = await request.get(GET_PRODUCTS, {
      params: queryParams,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
