import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Do NOT attach token for login
  if (token && !config.url.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;                                                                                                                                                                                                                                                                                                                                    
});

// RESPONSE INTERCEPTOR                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    let message = "Something went wrong";

    if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data?.message === "object") {
      message = Object.values(data.message).join(", ");
    }

    const isLoginCall = error.config?.url?.includes("/auth/login");

    // Token expired ONLY if not login request
    if ((status === 401 || status === 403) && !isLoginCall) {
      localStorage.clear();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
      return Promise.reject(error);
    }

    // Login failure → just show error
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
