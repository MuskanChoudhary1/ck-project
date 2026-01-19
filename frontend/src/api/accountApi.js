import api from "./axiosInstance";

export const getAccounts = () => api.get("/accounts");

export const createAccount = (accountData) => {
    return api.post("/accounts", accountData);
}