function TicketList({ tickets }) {
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
              <tr key={ticket.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{ticket.id}</td>
                <td className="py-2 px-4 border-b">{ticket.title}</td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`px-2 py-1 rounded ${
                    ticket.status === 'Active' ? 'bg-green-200' : 
                    ticket.status === 'Pending' ? 'bg-yellow-200' : 
                    'bg-red-200'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{ticket.customerName}</td>
                <td className="py-2 px-4 border-b">{ticket.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TicketList;
  