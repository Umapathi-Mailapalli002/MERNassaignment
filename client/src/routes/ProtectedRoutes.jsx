import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      {...rest}
      element={
        auth.isAuthenticated && (!requiredRole || auth.userRole === requiredRole) ? (
          element 
        ) : (
          <Navigate to="/login" replace /> 
        )
      }
    />
  );
};

export default ProtectedRoute;
