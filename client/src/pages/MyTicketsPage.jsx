import React, { useEffect, useState, useContext } from 'react';
import { getMyTickets } from '../../api/api.js';
import { AuthContext } from '../contextApi/AuthContext';

const MyTicketsPage = () => {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getMyTickets(token).then(setTickets).catch(console.error);
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Tickets</h2>
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 bg-white rounded shadow">
            <p className="font-medium text-gray-700">{ticket.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTicketsPage;
