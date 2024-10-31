import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const currentUser = await getCurrentUser(token);
          setUser(currentUser); 
        } catch (error) {
          handleLogout(); 
        }
      }
    };

    fetchCurrentUser();
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
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
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
