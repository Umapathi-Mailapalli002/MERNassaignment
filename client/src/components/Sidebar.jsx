import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
function Sidebar({dashbordRoute, ticketsRoute, customersRoute}) {
  return (
    <>
    <div className='flex justify-between '>
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Helpdesk</h2>
      <nav>
        <Link to={dashbordRoute} className="block py-2 px-4 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link to={ticketsRoute} className="block py-2 px-4 hover:bg-gray-700 rounded">
          Tickets
        </Link>
        <Link to={customersRoute} className="block py-2 px-4 hover:bg-gray-700 rounded">
          Customers
        </Link>
      </nav>
    </div>
    <ProfileIcon />
    </div>
    
    </>
    
  );
}

export default Sidebar;
