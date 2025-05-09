import { GET_NEWS } from "@/constants";
import request from "@/services";

export const getNews = async () => {
  try {
    const res = await request(GET_NEWS);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
