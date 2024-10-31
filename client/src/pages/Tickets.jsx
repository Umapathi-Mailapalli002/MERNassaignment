import React, { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getAllTickets(token);
        setTickets(ticketsData.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
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

      {showNewTicketForm && <TicketForm />}

      <TicketList tickets={tickets} />
    </div>
  );
}

export default Tickets;
