import { GET_ISSUES } from "@/constants";
import request from "@/services";

export const getIssues = async (search?: string, status?: string) => {
  try {
    const params = {
      ...(search && { topic: search }),
      ...(status && { status }),
    };
    const res = await request(GET_ISSUES, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
