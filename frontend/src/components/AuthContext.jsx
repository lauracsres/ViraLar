import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminName");
    setIsAuthenticated(!!adminLoggedIn);
  }, []);

  const login = (adminName) => {
    localStorage.setItem("adminName", adminName);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminName");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};