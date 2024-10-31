import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Tickets from './Tickets';
import Customers from './Customers';
import { AuthContext } from '../contextApi/AuthContext';
import { getAllTickets, getAllUsers } from '../../api/api';
import TicketDetailsPage from './TicketDetailsPage';

function AdminPage() {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getAllTickets(token);
        setTickets(ticketsData.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets.");
      }
    };

    const fetchCustomers = async () => {
      try {
        const customersData = await getAllUsers(token);
        setCustomers(customersData.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Failed to fetch customers.");
      }
    };

    const fetchData = async () => {
      if (token) {
        await Promise.all([fetchTickets(), fetchCustomers()]);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <Sidebar 
        dashbordRoute="/admin-dashboard" 
        ticketsRoute="/admin-dashboard/tickets" 
        customersRoute="/admin-dashboard/customers" 
      />
      <div className="flex-grow p-6 mt-20">
        <Routes>
          <Route index element={<Dashboard tickets={tickets} customers={customers}/>} />
          <Route path="tickets" element={<Tickets tickets={tickets} />} />
          <Route path="customers" element={<Customers customers={customers} />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
