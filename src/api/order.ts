import { GET_CART_ORDER, GET_LAST_ORDER, GET_SINGLE_ORDER } from "@/constants";
import request from "@/services";
import { format } from "date-fns";

export const getOrders = async (
  kontragentName: string | null,
  orderPriceStatus: string | null,
  orderDeleveryType: string | null,
  orderType: string | null,
  periodStart: Date | undefined,
  periodEnd: Date | undefined,
  orderNumber: string
) => {
  try {
    const params = {
      ...(kontragentName && { kontragentName }),
      ...(orderPriceStatus && { orderPriceStatus }),
      ...(orderDeleveryType && { orderDeleveryType }),
      ...(orderType && { orderType }),
      ...(periodStart && { periodStart: format(periodStart, "yyyy-MM-dd") }),
      ...(periodEnd && { periodEnd: format(periodEnd, "yyyy-MM-dd") }),
      ...(orderNumber && { orderNumber }),
    };
    const res = await request(GET_CART_ORDER, { params });
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getLastOrder = async () => {
  try {
    const res = await request(GET_LAST_ORDER);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getSingleOrder = async (id: string) => {
  try {
    const res = await request(`${GET_SINGLE_ORDER}/${id}`);
    return res.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
