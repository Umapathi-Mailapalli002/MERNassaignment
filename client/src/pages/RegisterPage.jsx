import React, { useState } from 'react';
import { signup } from '../../api/api.js';
import { useNavigate } from 'react-router-dom'; 

const RegisterPage = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
      .then(() => alert('User registered successfully'))
      .catch(console.error);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Register</h2>
        
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Register
        </button>

        {/* Link for existing users to navigate to the login page */}
        <p className="mt-4 text-center text-gray-600">
          Already a member?{' '}
          <span
            onClick={handleLoginRedirect}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
