import { GET_POPULAR } from "@/constants";
import request from "@/services";
export const getPopular = async () => {
  try {
    const res = await request(GET_POPULAR);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};