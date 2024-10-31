import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { AuthProvider } from './contextApi/AuthContext'; // Ensure this matches your export
import AdminPage from './pages/AdminPage';
function App() {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin-dashboard/*" element={<AdminPage />} />
            <Route path="/tickets/:ticketId" element={<TicketDetailsPage />} />
           
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
