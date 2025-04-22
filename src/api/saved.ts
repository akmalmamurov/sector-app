import { GET_SAVED } from "@/constants";
import request from "@/services";

export const getSaved = async () => {
  try {
    const res = await request(GET_SAVED);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
