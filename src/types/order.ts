export interface ProductDetails {
  productId: string;
  count: number;
}
export interface OrderRequest {
  city: string;
  productDetails: ProductDetails[];
  total: number;
  lastname: string;
  firstname: string;
  phone: number | string;
  email: string;
  fullname?: string;
  contrAgentId: string;
  deliveryMethod: string;
}
