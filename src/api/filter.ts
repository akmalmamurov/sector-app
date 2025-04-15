import {GET_PRODUCT_FILTER } from "@/constants";
import request from "@/services";

export const getFilter = async ( queryParams: string, paramKey: string ) => {
  try {
    const params = { [paramKey]: queryParams, };
    const res = await request(GET_PRODUCT_FILTER, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
