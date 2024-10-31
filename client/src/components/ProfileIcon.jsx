import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contextApi/AuthContext';
import { getCurrentUser } from '../../api/api';

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { handleLogout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUser = async() => {
        const user = await getCurrentUser(token);
        setUser(user.data);
    }
    fetchUser();
  },[])

  return (
    <div className="absolute right-5 top-7 inline-block text-left ">
      <button onClick={toggleMenu} className="size-12 flex justify-center items-center bg-red-300 rounded-full">
        <span className="size-12 text-2xl rounded-full flex justify-center items-center font-semibold text-gray-800">{user?.avatar}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <h3 className='text-center'>Admin</h3>
          <button
            onClick={() => navigate('/account')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Profile
          </button>
          <button
             onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
