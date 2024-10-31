import React from "react";
import { useNavigate } from "react-router-dom";

function TicketList({ tickets }) {
  const navigate = useNavigate(); 

  const handleRowClick = (ticketId) => {
    navigate(`/admin-dashboard/tickets/${ticketId}`);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ticket ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="hover:bg-gray-100" onClick={() => handleRowClick(ticket._id)}> {/* Add click handler */}
              <td className="py-2 px-4 border-b">{ticket._id}</td>
              <td className="py-2 px-4 border-b">{ticket.title}</td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`px-2 py-1 rounded ${
                  ticket.status === 'Active' ? 'bg-green-300' : 
                  ticket.status === 'Pending' ? 'bg-yellow-300' : 
                  'bg-red-300'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{ticket.user.username}</td>
              <td className="py-2 px-4 border-b">
                {new Date(ticket.lastUpdatedOn).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
