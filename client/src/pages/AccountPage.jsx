import React, { useState, useContext } from 'react';
import { getCurrentUser, updateAccount } from '../../api/api.js';
import { AuthContext } from '../contextApi/AuthContext';

const AccountPage = () => {
  const { token } = useContext(AuthContext);
  const [accountData, setAccountData] = useState({ username: '', email: '' });

  useEffect(() => {
    getCurrentUser(token).then(setAccountData).catch(console.error);
  }, [token]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAccount(token, accountData).then(() => alert('Account updated')).catch(console.error);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          value={accountData.username}
          onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="email"
          value={accountData.email}
          onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
