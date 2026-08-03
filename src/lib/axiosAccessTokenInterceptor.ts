import axios from "axios";
import { getRefreshToken, getSession } from "@/shared/utils/getSession";
import { JWTTokenServices } from "@/services/token/JWTToken";

const API = process.env.NEXT_PUBLIC_API || "http://localhost:3000";

// Create SSR-safe axios instance
const api = axios.create({
  baseURL: `${API}/api`,
  withCredentials: true, // IMPORTANT
});

// Prevent infinite loop on refresh
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

// Handle refresh call
const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken(); // may be null if outside request context

  const res = await axios.post(
    `${API}/api/auth/refresh`,
    {},
    {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  if (!res.data?.token) {
    throw new Error("Failed to refresh token");
  }

  return res.data.token;
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  async (config) => {
    const token = await getSession(); // may be null if outside request context

    // We have token → validate it
    const jwtServices = new JWTTokenServices();
    const isValid = jwtServices.verifyToken(token as string);

    // No token: try refresh
    if (!token || isValid.status !== "valid") {
      if (!token) {
        console.log("no token");
      } else {
        console.log("token is: ", isValid.status);
      }
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          refreshQueue.forEach((resolve) => resolve(newToken));
          refreshQueue = [];
          config.headers.Authorization = `Bearer ${newToken}`;

          return config;
        } catch (err) {
          isRefreshing = false;
          refreshQueue = [];
          throw err;
        }
      }
      return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        refreshQueue.push((_newToken) => {
          config.headers.Authorization = `Bearer newToken`;
          resolve(config);
        });
      });
    }

    // Token valid → attach it
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
