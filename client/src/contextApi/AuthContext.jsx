import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, getCurrentUser } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? storedUser.data : null;
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const currentUser = await getCurrentUser(storedToken);
          console.log(currentUser);
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
          handleLogout();
        }
      } else {
        handleLogout(); // No token found, logout
      }
    };
    fetchCurrentUser();
  }, []); // Only runs on token change

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.data.user.role;
  };

  const handleLogin = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      const token = await userData?.data.accessToken;
      console.log("Token received during login:", token); // Debugging line
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setToken(token);
      setError(null);

      const role = getUserRole();
      if (role === "Customer") {
        navigate("/customer");
      } else if (role === "CustomerServiceAgent") {
        navigate("/agent");
      } else if (role === "Admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) await logoutUser(token);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, handleLogin, error, handleLogout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
