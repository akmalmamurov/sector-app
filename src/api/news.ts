import { GET_NEWS, GET_NEWS_BY_SLUG } from "@/constants";
import request from "@/services";

interface INewsParams {
  page?: string;
  home?: boolean; 
}

export const getNews = async ({ page, home }: INewsParams) => {
  try {
    let query = "";

    if (page) {
      query += `?page=${page}`;
    }

    if (home) {
      query += query ? `&home=true` : `?home=true`;
    }

    const res = await request(GET_NEWS + query);
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
