import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TicketDetails from './pages/TicketDetails';
import CreateTicket from './pages/CreateTicket';
import MyTickets from './pages/MyTickets';
import Account from './pages/Account';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Public routes */}
          <Route exact path="/login" component={AuthPage} />
          <Route exact path="/signup" component={AuthPage} />

          {/* General user routes */}
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/my-tickets" component={MyTickets} />
          <ProtectedRoute exact path="/create-ticket" component={CreateTicket} />
          <ProtectedRoute exact path="/ticket/:ticketId" component={TicketDetails} />
          <ProtectedRoute exact path="/account" component={Account} />

          {/* Customer Service Agent and Admin routes */}
          <ProtectedRoute
            exact
            path="/all-tickets"
            component={AllTickets}
            requiredRole="CustomerServiceAgent"
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            component={Dashboard}
            requiredRole="Admin"
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
