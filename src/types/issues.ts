import { UserData } from "./user";
export interface IssueesMessage {
  createdAt: string;
  message: string;
  adminId?: string;
  userId: string;
  filePath?: string;
}
export interface IssuesData {
  id: string;
  createdAt: string;
  email: string;
  fullName: string;
  orderId: string;
  orderNumber?: string;
  requestNumber: string;
  status: string;
  topic: string;
  topicCategory: string;
  user: UserData;
  messages: IssueesMessage[];
}
export interface IssuesResponse {
  total: number;
  requests: IssuesData[];
}
