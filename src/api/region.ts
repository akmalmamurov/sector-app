import { GET_REGION } from "@/constants";
import request from "@/services";

export const getRegion = async (search?: string) => {
  try {
    const params = {
      ...(search && { name: search }),
    };
    const res = await request(GET_REGION, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
