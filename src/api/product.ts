import {
  GET_PRODUCT_CATEGORY,
  GET_PRODUCTS,
  GET_PROMOTION,
  GET_PRODUCT_SINGLE,
} from "@/constants";
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
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductSingle = async (slug: string) => {
  try {
    const res = await request(`${GET_PRODUCT_SINGLE}/${slug}`);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductCategory = async (
  queryParams: string,
  page: number,
  limit: number,
  paramKey: string,
  inStock: boolean,
  popular: boolean,
  priceSort: "asc" | "desc" | null,
  nameSort: "asc" | "desc" | null
) => {
  try {
    const params = {
      [paramKey]: queryParams,
      page,
      limit,
      ...(inStock && { inStock: true }),
      ...(popular && { popular: true }),
      ...(priceSort && {price:priceSort }),
      ...(nameSort && {name:nameSort }),
    };
    const res = await request(GET_PRODUCT_CATEGORY, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};


