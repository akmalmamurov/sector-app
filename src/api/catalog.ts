import { GET_CATALOG } from "@/constants";
import request from "@/services";

export const getCatalog = async () => {
  try {
    const res = await request(GET_CATALOG);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
