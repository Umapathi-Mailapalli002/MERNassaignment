import React, { useState, useEffect } from 'react';

function Customers() {
  const [customers, setCustomers] = useState([]);

  // Mock data fetch for customers
  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulate fetching customers from backend
      const data = [
        { id: 'C001', name: 'John Doe', email: 'john@example.com', tickets: 5 },
        { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', tickets: 3 },
        // Add more customers as needed
      ];
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Customer ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Tickets</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b text-center">{customer.tickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
