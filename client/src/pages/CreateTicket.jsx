import React from 'react';
import { useForm } from 'react-hook-form';
import { createTicket } from '../api/ticketApi';

const CreateTicket = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createTicket(data);
      alert("Ticket created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title", { required: true })} placeholder="Title" />
        <textarea {...register("description", { required: true })} placeholder="Description" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicket;
