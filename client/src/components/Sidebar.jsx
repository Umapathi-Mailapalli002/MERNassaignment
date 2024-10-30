import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Helpdesk</h2>
      <nav>
        <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link to="/tickets" className="block py-2 px-4 hover:bg-gray-700 rounded">
          Tickets
        </Link>
        <Link to="/customers" className="block py-2 px-4 hover:bg-gray-700 rounded">
          Customers
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
