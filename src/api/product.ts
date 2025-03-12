import { GET_PRODUCT_CATEGORY, GET_PRODUCTS, GET_PROMOTION } from "@/constants";
import request from "@/services";
import { ProductData } from "@/types";

export const getProducts = async (
  queryParams: string
): Promise<ProductData[]> => {
  try {
    let queryStr = "";
    if (queryParams === "recommended")
      queryStr = `${GET_PRODUCTS}?${queryParams}=true`;
    else if (queryParams === "condition")
      queryStr = `${GET_PRODUCTS}?${queryParams}=new`;
    else if (queryParams === "popular")
      queryStr = `${GET_PRODUCTS}?${queryParams}=true`;
    else if (queryParams === "promotion") queryStr = GET_PROMOTION;
    else queryStr = GET_PRODUCTS;

    const res = await request.get(queryStr);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductCategory = async (queryParams: string) => {
  try {
    const res = await request(GET_PRODUCT_CATEGORY, {
      params: { categorySlug: queryParams } 
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

