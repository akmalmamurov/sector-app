import { GET_BANNER } from "@/constants";
import request from "@/services";

export const getBanner = async (queryParams: Record<string, string>) => {
  try {
    const res = await request.get(GET_BANNER, {
      params: queryParams
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};