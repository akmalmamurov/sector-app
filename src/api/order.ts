import { GET_CART_ORDER, GET_LAST_ORDER } from "@/constants";
import request from "@/services";

export const getOrders = async (kontragentName: string | null) => {
  try {
    const params = {
      kontragentName,
    };
    const res = await request(GET_CART_ORDER, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getLastOrder = async () => {
  try {
    const res = await request(GET_LAST_ORDER);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
