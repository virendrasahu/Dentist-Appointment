import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  // withCredentials: true, // optional (keep if using auth/cookies)
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or not authorized globally
            localStorage.removeItem('adminToken');
            // If we are not already at root, or we want forcefully logout user:
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;
