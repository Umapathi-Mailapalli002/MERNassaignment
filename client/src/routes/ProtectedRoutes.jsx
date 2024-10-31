import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contextApi/AuthContext';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("Protected route access, isAuthenticated:", isAuthenticated); // Debug
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
