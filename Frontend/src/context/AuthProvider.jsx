import React, { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext({
  getUser: () => null,
  onLogin: () => {},
  onLogout: () => {},
  onSignup: () => {},
  sideBar: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBar, setSideBar] = useState(false);

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  };

  const handleLogin = (user, options = { shouldNavigate: false }) => {
    const { shouldNavigate } = options;
    setUser(user);
    if (shouldNavigate) {
      const origin = location.state?.from || "/me"; // remember the origin
      navigate(origin);
    }
  };

  const handleSignup = () => {
    navigate("/user/login", { replace: true });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    navigate("/user/login", { replace: true });
  };

  const contextValues = {
    getUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup: handleSignup,
    sideBar,
    setSideBar,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
