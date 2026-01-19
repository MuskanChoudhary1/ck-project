import api from "./axiosInstance";

export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getMe = () => api.get("/users/me");