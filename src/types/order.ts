export interface OrderRequest {
  city: string;
  products: {
    productId: string;
    count: number;
  };
  total: number;
  lastname: string;
  firstname: string;
  phone: number | string;
  email: string;
  fullname?: string;
  contrAgentId: string;
  deliveryMethod: string;
}
