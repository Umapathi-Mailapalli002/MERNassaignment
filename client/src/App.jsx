// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import TicketForm from './components/TicketForm';
import TicketDetailsPage from './pages/TicketDetailsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import MyTicketsPage from './pages/MyTicketsPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { AuthProvider } from './contextApi/AuthContext'; // Ensure this matches your export

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
            <Route path="/" element={<Dashboard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/create-ticket" element={<TicketForm />} />
            <Route path="/tickets/:ticketId" element={<TicketDetailsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
          </Route>

          {/* Redirect to login for unknown paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
