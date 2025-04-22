import { AddressData } from "./address";

export interface ContrAgentRequest {
  ownershipForm: string;
  inn: string;
  pnfl: string;
  oked: string;
  name: string;
  legalAddress: string;
  isFavorite: boolean;
}
export interface ContrAgentData {
  id: string;
  inn: string;
  isFavorite: boolean;
  legalAddress: string;
  name: string;
  oked: string;
  ownershipForm: string;
  pnfl: string;
  user: {
    email: string;
    id: string;
    name: string;
    phone: string;
  };
  address: AddressData[];
}

export interface DeliveryRequest {
  deliveryMethod: string;
  agentId?: string;
  address?: AddressData;
}
