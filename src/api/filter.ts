import { GET_PRODUCT_FILTER, GET_PRODUCT_FILTER_SEARCH } from "@/constants";
import request from "@/services";

type FilterSearchParams = {
  subcatalogSlug?: string | null;
  categorySlug?: string | null;
  options: { name: string | null; options: { name: string | null }[] }[];
};

export const getFilter = async (queryParams: string, paramKey: string) => {
  try {
    const params = { [paramKey]: queryParams };
    const res = await request(GET_PRODUCT_FILTER, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFilterSearch = async (queryParams: FilterSearchParams) => {
  try {
    const res = await request(GET_PRODUCT_FILTER_SEARCH, {
      params: {
        subcatalogSlug: queryParams.subcatalogSlug,
        categorySlug: queryParams.categorySlug,
        options: queryParams.options,
      },
    });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
