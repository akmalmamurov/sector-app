import { GET_NEWS, GET_NEWS_BY_SLUG } from "@/constants";
import request from "@/services";

export const getNews = async ({ page }: { page: string }) => {
  try {
    const res = await request(page ? GET_NEWS + `?page=${page}` : GET_NEWS);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewsById = async (slug: string) => {
  try {
    const res = await request(GET_NEWS_BY_SLUG(slug));
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
