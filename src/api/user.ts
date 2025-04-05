import { GET_ME } from "@/constants";
import request from "@/services";

export const getUser = async () => {
    try {
      const res = await request(GET_ME);
      return res.data.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };