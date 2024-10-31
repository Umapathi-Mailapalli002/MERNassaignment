import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contextApi/AuthContext';
import {getAllTickets,  getAllUsers } from '../../api/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getAllUsers(token);
        console.log(customersData)
        setCustomers(customersData.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
   
    if (token) {
      fetchCustomers();
    }
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
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{customer._id}</td>
              <td className="py-2 px-4 border-b">{customer.username}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
