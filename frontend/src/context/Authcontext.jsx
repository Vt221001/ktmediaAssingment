import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [name, setName] = useState(localStorage.getItem("name") || null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode(accessToken);
      if (decoded.exp * 1000 < Date.now()) {
        refreshAccessToken();
      } else {
        setUserId(decoded.id);
        setName(decoded.name);
        setTimeout(refreshAccessToken, decoded.exp * 1000 - Date.now() - 30000);
      }
    } catch {
      logout();
    }
  }, [accessToken]);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        }
      );

      const newAccessToken = res.data.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);
      const decoded = jwtDecode(newAccessToken);
      setUserId(decoded.id);
      setName(decoded.name);
      setTimeout(refreshAccessToken, decoded.exp * 1000 - Date.now() - 30000);
    } catch {
      logout();
    }
  };

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const decoded = jwtDecode(accessToken);
    localStorage.setItem("userId", decoded.id);
    localStorage.setItem("name", decoded.name);
    setAccessToken(accessToken);
    setUserId(decoded.id);
    setTimeout(refreshAccessToken, decoded.exp * 1000 - Date.now() - 30000);
    navigate("/");
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
        userId: userId,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId"); // ✅ ID bhi hata di
    setUserId(null);
    setAccessToken(null);
    setName(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userId, name, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
