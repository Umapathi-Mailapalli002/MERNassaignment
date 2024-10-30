import React, { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import NewTicketForm from '../components/NewTicketForm';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = [
        { id: '001', title: 'Payment issue', status: 'Active', customerName: 'John Doe', lastUpdated: '2024-10-01' },
        { id: '002', title: 'Login issue', status: 'Pending', customerName: 'Jane Smith', lastUpdated: '2024-10-05' },
      ];
      setTickets(data);
    };
    fetchTickets();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <button 
          onClick={() => setShowNewTicketForm(!showNewTicketForm)} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {showNewTicketForm ? 'Close' : 'New Ticket'}
        </button>
      </div>

      {showNewTicketForm && <NewTicketForm />}

      <TicketList tickets={tickets} />
    </div>
  );
}

export default Tickets;
