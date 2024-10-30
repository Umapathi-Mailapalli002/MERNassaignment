import React from 'react';
import { useForm } from 'react-hook-form';
import { updateAccount } from '../../api/api.js';

const Account = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateAccount(data);
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div>
      <h1>My Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />
        <input {...register("email")} placeholder="Email" />
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default Account;
