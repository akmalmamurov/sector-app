import { GET_REGION } from "@/constants";
import request from "@/services";

export const getRegion = async () => {
  try {
    const res = await request(GET_REGION);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
