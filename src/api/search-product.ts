import { USER_PRODUCT_SEARCH } from "@/constants";
import request from "@/services";

export const getSearchProduct = async (
  search?: string,
  page?: number,
  limit?: number,
  inStock?: boolean,
  popular?: boolean,
  priceSort?: "asc" | "desc" | null,
  nameSort?: "asc" | "desc" | null
) => {
  try {
    const params = {
      search,
      page,
      limit,
      ...(inStock && { inStock: true }),
      ...(popular && { popular: true }),
      ...(priceSort && { price: priceSort }),
      ...(nameSort && { name: nameSort }),
    };
    const res = await request(USER_PRODUCT_SEARCH, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
