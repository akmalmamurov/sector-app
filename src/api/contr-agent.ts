import { GET_AGENT } from "@/constants";
import request from "@/services";

export const getAgent = async () => {
  try {
    const res = await request.get(GET_AGENT);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
  }
};
