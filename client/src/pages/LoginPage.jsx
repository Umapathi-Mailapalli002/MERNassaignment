import React, { useState, useContext } from 'react';
import { AuthContext } from '../contextApi/AuthContext';
import { Link } from 'react-router-dom'; 

const LoginPage = () => {
  const { handleLogin, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Login</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
        />
        
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
        />
        
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Login
        </button>
        
        <p className="mt-4 text-gray-600 text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
