import { AddressData } from "./address";
import { KontrAgents } from "./agent-delivery";

export interface ProductDetails {
  productId: string;
  count: number;
  garanteeId?: string;
}

export interface OrderRequest {
  productDetails: ProductDetails[];
  garanteeId?: string;
  deliveryMethod: string;
  kontragentId: string;
  city: string;
  total: number;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  fullname?: string;
  agentId?: string;
}

export interface ContactData {
  fullname: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}
export interface OrderProductData {
  id: string;
  mainImage: string;
  price: number;
  productCode: string;
  slug: string;
  title: string;
}
export interface OrderProducts {
  count: number;
  price: number;
  product: OrderProductData;
  productId: string;
  productLink: string;
}
export interface OrdersData {
  agent: AddressData;
  agentId: string;
  city: string;
  comment: string | null;
  contrAgentId: string;
  deliveryMethod: string;
  email: string;
  fullname: string;
  id: string;
  kontragent: KontrAgents;
  orderNumber: string;
  orderPriceStatus: string;
  orderType: string;
  paymentMethod: string | null;
  kontragentName: string;
  phone: string;
  products: OrderProducts[];
  total: string;
  user: {
    email: string;
    id: string;
    name: string;
    phone: string;
  };
  validEndDate: string;
  validStartDate: string;
}
export interface OrderResponse {
  page: number;
  total: number;
  orders: OrdersData[];
}
