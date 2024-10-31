import React from "react";
function Dashboard({tickets, customers}) {
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p>Total Tickets: {tickets.length}</p>
        <p>Total Customers: {customers.length}</p>
      </div>
    );
  }
  
  export default Dashboard;
  