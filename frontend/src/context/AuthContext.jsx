
import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const login = (token, role, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setToken(token);
    setRole(role);
    setName(name);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setName("");
  };

  const isLoggedIn = !!token;

  const canAccess = (page) => {
    if (role === "ADMIN") return true;

    if (role === "READ_ONLY") {
      return ["DASHBOARD", "COST", "AWS", "ONBOARDING", "USERS"].includes(page);
    }

    if (role === "CUSTOMER") {
      return ["DASHBOARD", "COST", "AWS"].includes(page);
    }

    return false;
  };

  const isReadOnly = role === "READ_ONLY";

  return (
    <AuthContext.Provider
    value={{ token, role, name, login, logout, isLoggedIn, canAccess, isReadOnly }}    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
