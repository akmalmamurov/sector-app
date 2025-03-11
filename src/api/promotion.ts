import { GET_PROMOTION } from "@/constants";
import request from "@/services";
export const getPromotion = async () => {
  try {
    const res = await request(GET_PROMOTION);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
