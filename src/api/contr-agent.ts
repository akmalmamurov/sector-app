import { GET_AGENT, SINGLE_AGENT_ADDRESS, UPDATE_AGENT, UPDATE_AGENT_ADDRESS } from "@/constants";
import request from "@/services";

export const getAgent = async (search?: string) => {
  try {
    const params = {
      ...(search && { inn: search }),
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

export const getAgentAdress = async (id: string) => {
  try {
    const res = await request(`${SINGLE_AGENT_ADDRESS}/${id}`);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
  }
};
export const updateAgentAddress = async (id: string) => {
  try {
    const res = await request.patch(`${UPDATE_AGENT_ADDRESS}/${id}`, {
      isMain: true,
    });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
  }
};