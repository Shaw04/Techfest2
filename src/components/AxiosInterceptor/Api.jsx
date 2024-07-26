import axios from "axios";
// import { useAuth0 } from '@auth0/auth0-react';

let auth0Client;

export const initializeAuth0Client = (auth0) => {
  auth0Client = auth0;
};

const Api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API base URL
});

Api.interceptors.request.use(
  async (config) => {
    if (!auth0Client) {
      console.error("Auth0 client not initialized");
      return config;
    }

    try {
      const claims = await auth0Client.getIdTokenClaims();
      const token = claims.__raw; // This is the raw ID token
      console.log("Raw token:", token);
      console.log("Token parts:", token.split(".").length);
      try {
        console.log("Payload:", JSON.parse(atob(token.split(".")[1])));
      } catch (e) {
        console.log("Failed to decode payload:", e);
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error getting access token", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (same as before)
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const claims = await auth0Client.getIdTokenClaims({
          ignoreCache: true,
        });
        const token = claims.__raw;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return Api(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token", refreshError);
        // Handle refresh error (e.g., redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
