import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketById, getNotesForTicket, addNote } from '../api/ticketApi';
import { useForm } from 'react-hook-form';

const TicketDetails = () => {
  const { ticketId } = useParams(); // Get the ticket ID from the route
  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    // Fetch ticket details and notes
    const fetchTicketDetails = async () => {
      try {
        const ticketResponse = await getTicketById(ticketId);
        setTicket(ticketResponse.data);
        
        const notesResponse = await getNotesForTicket(ticketId);
        setNotes(notesResponse.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  // Function to add a new note to the ticket
  const onAddNote = async (data) => {
    try {
      const response = await addNote(ticketId, data);
      setNotes([...notes, response.data]);
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (!ticket) return <p>Loading ticket details...</p>;

  return (
    <div>
      <h1>Ticket Details</h1>
      <div>
        <h2>{ticket.title}</h2>
        <p>{ticket.description}</p>
        <p>Status: {ticket.status}</p>
      </div>

      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <h3>Add a Note</h3>
      <form onSubmit={handleSubmit(onAddNote)}>
        <textarea {...register("content")} placeholder="Enter note" required />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default TicketDetails;
