export interface AddressData {
  id: string;
  fullAddress: string;
  apartment: string;
  country: string;
  house: string;
  region: string;
  isMain: boolean;
  district: string;
  street: string;
  index: string;
  comment: string;
  createdAt: string;
  postal_code: string;
  full_street?: string;
  city?: string;
}

export interface ResultAgentAddress {
  city: string;
  country: string;
  description: string;
  district: string;
  formatted_address: string;
  region: string;
  street: string;
  postal_code: string;
  apartment: string;
  index?: string;
  house?: string;
  full_street?: string;
  
}
export interface AgentAdressRequest {
  fullAddress: string;
  country: string;
  region: string;
  district: string;
  street: string;
  house: string;
  apartment?: string;
  index?: string;
  comment?: string;
  isMain: boolean;
}
