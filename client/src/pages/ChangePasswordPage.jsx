import React, { useState, useContext } from 'react';
import { changePassword } from '../../api/api.js';
import { AuthContext } from '../contextApi/AuthContext';

const ChangePasswordPage = () => {
  const { token } = useContext(AuthContext);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(token, passwordData)
      .then(() => alert('Password changed successfully'))
      .catch(console.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Change Password</h2>
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
          placeholder="Old Password"
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          placeholder="New Password"
          className="w-full p-3 border rounded mb-4"
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
