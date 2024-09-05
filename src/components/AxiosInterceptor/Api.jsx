import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8081", // Replace with your API base URL
});

const techfestApi = axios.create({
  baseURL: "http://localhost:8080", // Techfest service base URL
});

// Request interceptor to attach the token
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const newToken = await getNewAccessToken();
        const newToken = localStorage.getItem("access_token");
        localStorage.setItem("access_token", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return Api(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token", refreshError);
        // Redirect to login or handle token refresh failure
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

techfestApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        // Validate token with auth service
        const response = await Api.post("/auth/validate", { token });
        if (response.status == 200) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Token validation failed", error);
        window.location.href = "/";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

techfestApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = localStorage.getItem("access_token");
        localStorage.setItem("access_token", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return techfestApi(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token", refreshError);
        // Redirect to login or handle token refresh failure
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

// Function to get a new access token
// async function getNewAccessToken() {
//   try {
//     const response = await axios.get(
//       "http://localhost:8081/auth/token/refresh"
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error("Failed to get new access token", error);
//     throw error;
//   }
// }

export default Api;
export { techfestApi };
