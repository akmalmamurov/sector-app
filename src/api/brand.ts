import { showError } from "@/components/toast/Toast";
import { GET_BRAND_POPULAR, GET_BRAND_SINGLE, GET_BRANDS } from "@/constants";
import request from "@/services";

export const getBrands = async () => {
  try {
    const res = await request(GET_BRANDS);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBrandPopular = async () => {
  try {
    const res = await request(GET_BRAND_POPULAR);
    return res.data.data;
  } catch (error) {
    console.log(error);
    showError("Популярные бренды не найдены");
  }
};

export const getBrandSingle = async (id: string) => {
  try {
    const res = await request(`${GET_BRAND_SINGLE}/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
