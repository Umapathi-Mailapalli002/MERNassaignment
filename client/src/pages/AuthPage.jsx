import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup, loginUser } from '../../api/api.js';

const AuthPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLogin, setIsLogin] = useState(true); 

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset(); 
  };

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await loginUser(data);
        alert("Login successful!");
      } else {
        await signup(data);
        alert("Signup successful! Please log in.");
        setIsLogin(true); 
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register("username", { required: true })}
              placeholder="Enter your username"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleAuthMode}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
