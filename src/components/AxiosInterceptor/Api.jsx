import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8081", // Replace with your API base URL
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
        window.location.href = "/login";
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
