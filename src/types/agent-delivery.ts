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
export interface KontrAgents {
  id: string;
  inn: string;
  isFavorite: boolean;
  legalAddress: string;
  name: string;
  oked: string;
  ownershipForm: string;
  pnfl: string;
  address: AddressData[];
  user: {
    email: string;
    id: string;
    name: string;
    phone: string;
  };
}
export interface userKontrAgent {
  inn: string;
  name: string;
}
export interface ContrAgentData {
  kontragents: KontrAgents[];
  user_kontragents: userKontrAgent[];
}

export interface DeliveryRequest {
  deliveryMethod: string;
  agentId?: string;
  address?: AddressData;
}
