import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../utils/api";
import FullPageLoader from "../pages/FullPageLoader";
import { toast } from "react-toastify";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const login = async (email, password) => {
    try {
      setLoadingAuth(true);
      const response = await api.post("/auth/login", { email, password });

      const newToken = response.data.token;
      const userData = response.data.user;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Email or password incorrect";
      toast.error(errorMessage);
      return { success: false };
    } finally {
      setLoadingAuth(false);
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      setLoadingAuth(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.token) {
        const newToken = response.data.token;
        const userData = response.data.user;
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      toast.success("Account created successfully!");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      return { success: false };
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  // الدالة الجديدة الخاصة بحفظ توكن جوجل
  const handleGoogleCallback = (newToken) => {
    setLoadingAuth(true);
    setToken(newToken);
    localStorage.setItem("token", newToken);

    // مؤقتاً لحد ما نعمل Endpoint يجيب بيانات اليوزر بناءً على التوكن
    toast.success("Welcome back with Google!");
    setLoadingAuth(false);
  };

  if (showSplash) {
    return <FullPageLoader onFinished={() => setShowSplash(false)} />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loadingAuth,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        handleGoogleCallback, // تم التمرير هنا
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
