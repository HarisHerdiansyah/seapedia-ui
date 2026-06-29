import { useUserStore } from "@/store/userStore";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://seapedia-api-latest.onrender.com/api"
    : "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": true,
    "Content-Type": "application/json",
  },
});

export const serverApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": true,
    "Content-Type": "application/json",
  },
});

type FailedQueue = {
  resolve: (value: string | null) => void;
  reject: (err?: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error: unknown, newToken: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(newToken);
    }
  });
  failedQueue = [];
};

apiClient.defaults.withCredentials = true;

apiClient.interceptors.request.use((config) => {
  const authStorage = window.localStorage.getItem("auth-storage");
  const accessToken = JSON.parse(authStorage ?? "null")?.state.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/authentication/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        const data = response.data.data;
        const newAccessToken = data.accessToken;
        useUserStore.setState({ accessToken: newAccessToken });

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        window.localStorage.removeItem("auth-storage");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
