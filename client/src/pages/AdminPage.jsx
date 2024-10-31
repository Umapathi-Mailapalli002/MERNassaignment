import React, { useContext, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Tickets from './Tickets';
import Customers from './Customers';
import { AuthContext } from '../contextApi/AuthContext';
import { getAllTickets, getAllUsers } from '../../api/api';

function AdminPage() {
    const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getAllTickets(token);
        setTickets(ticketsData.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const customersData = await getAllUsers(token);
        setCustomers(customersData.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    if (token) {
      fetchTickets();
      fetchCustomers();
    }
  }, [token]);

  return (
    <div className="flex">
      <Sidebar dashbordRoute="/admin-dashboard" ticketsRoute="/admin-dashboard/tickets" customersRoute="/admin-dashboard/customers" />
      <div className="flex-grow p-6 mt-20">
          <Routes>
          <Route index element={<Dashboard tickets={tickets} customers={customers}/>} /> {/* Matches /dashboard */}
          <Route path="tickets" element={<Tickets />} /> {/* Matches /dashboard/tickets */}
          <Route path="customers" element={<Customers />} /> {/* Matches /dashboard/customers */}
          </Routes>
        </div>
    </div>
  )
}

export default AdminPage
