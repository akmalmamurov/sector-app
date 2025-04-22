export interface OrderRequest {
  city: string;
  products: string[];
  total: number;
  lastname: string;
  firstname: string;
  phone: number | string;
  email: string;
  fullname?: string;
  contrAgentId: string;
  deliveryMethod: string;
}
