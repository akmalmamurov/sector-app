import { GET_AGENT, UPDATE_AGENT } from "@/constants";
import request from "@/services";

export const getAgent = async () => {
  try {
    const res = await request.get(GET_AGENT);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const updateAgent = async (id: string) => {
  try {
    const res = await request.patch(`${UPDATE_AGENT}/${id}`, {
      isFavorite: true,
    });
    return res.data.data || [];
    
  } catch (error) {
    console.log(error);
  }
};
