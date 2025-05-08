import { GET_ME, UPDATE_ME } from "@/constants";
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

  export const updateUserPhone = async (phone: string) => {
    try {
      const res = await request.patch(UPDATE_ME, { phone });
      return res.data.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

