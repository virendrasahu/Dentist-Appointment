import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? "https://dentist-appointment-suda.onrender.com/api"
      : "http://localhost:5000/api"),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRequest = error.config?.url?.includes("/auth/");

      if (!isAuthRequest) {
        localStorage.removeItem("adminToken");

        if (window.location.pathname.startsWith("/dashboard")) {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
