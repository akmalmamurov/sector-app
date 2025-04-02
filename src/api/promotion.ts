import { GET_PROMOTION, GET_PROMOTION_SINGLE } from "@/constants";
import request from "@/services";
export const getPromotion = async () => {
  try {
    const res = await request(GET_PROMOTION);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const getPromotionSingle = async (id: string) => {
  try {
    const res = await request(`${GET_PROMOTION_SINGLE}/${id}`);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};