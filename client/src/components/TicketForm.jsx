import React, { useState, useContext } from 'react';
import { createTicket } from '../../api/api.js';
import { AuthContext } from '../contextApi/AuthContext';

const TicketForm = () => {
  const { token } = useContext(AuthContext);
  const [ticketData, setTicketData] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(token, ticketData).then(() => {
      setTicketData({ title: '', description: '' });
      alert('Ticket created successfully');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Ticket</h2>
      <input
        type="text"
        value={ticketData.title}
        onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
        placeholder="Ticket Title"
        className="w-full p-3 mb-4 border rounded"
      />
      <textarea
        value={ticketData.description}
        onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
        placeholder="Description"
        className="w-full p-3 mb-4 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Submit
      </button>
    </form>
  );
};

export default TicketForm;
