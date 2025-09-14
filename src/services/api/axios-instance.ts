import axios from "axios";
import { useAuthStore } from "../../stores/auth-store";
import type { AxiosApiError } from "../../types/error.types";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (
  error: AxiosApiError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosApiError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes("/refresh-token")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      const authStore = useAuthStore.getState();
      const refreshToken = authStore.refreshToken;

      if (!refreshToken) {
        authStore.clearAuth();
        // window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          { refreshToken }
        );

        const { access_token, refresh_token } = response.data;
        authStore.setAuth(access_token, refresh_token);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        }

        isRefreshing = false;
        processQueue(null, access_token);

        return apiInstance(originalRequest);
      } catch (err) {
        authStore.clearAuth();
        isRefreshing = false;
        processQueue(err as AxiosApiError);
        // window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
