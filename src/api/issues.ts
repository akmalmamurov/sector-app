import { GET_ISSUES } from "@/constants";
import request from "@/services";

export const getIssues = async () => {
  try {
    const res = await request(GET_ISSUES);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};