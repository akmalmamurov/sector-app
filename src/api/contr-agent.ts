import { GET_AGENT, UPDATE_AGENT } from "@/constants";
import request from "@/services";

export const getAgent = async (search?: string) => {
  try {
    const params = {
      ...(search && { name: search }),
    };
    const res = await request.get(GET_AGENT, { params });
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
