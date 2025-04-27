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
  phone: number | string;
  email: string;
  fullname?: string;
  agentId?: string;
  
}
