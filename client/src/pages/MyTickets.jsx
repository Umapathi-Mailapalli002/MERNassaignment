import React, { useEffect, useState } from 'react';
import { getMyTickets } from '../../api/api.js';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getMyTickets();
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h1>My Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;
