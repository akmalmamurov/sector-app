import useStore from "@/context/store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
interface ErrorResponse {
  message: string;
}
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sector-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
request.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (
      error.response?.status === 401 &&
      error.response.data?.message === "Invalid or expired token"
    ) {
      useStore.getState().logOut();

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default request;
