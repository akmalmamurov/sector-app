import { GET_CART } from "@/constants";
import request from "@/services";

export const getCart = async () => {
  try {
    const res = await request(GET_CART);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
