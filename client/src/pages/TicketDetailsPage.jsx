import React, { useEffect, useState, useContext } from 'react';
import { getTicketById, updateTicketStatus, addNote, getNotesForTicket } from '../../api/api.js';
import { AuthContext } from '../contextApi/AuthContext';
import { useParams } from 'react-router-dom';

const TicketDetailsPage = () => {
  const { token } = useContext(AuthContext);
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    getTicketById(ticketId, token).then(setTicket);
    getNotesForTicket(token, ticketId).then(setNotes);
  }, [ticketId, token]);

  const handleStatusUpdate = () => {
    updateTicketStatus(token, ticketId, { status }).then(() => {
      setTicket((prev) => ({ ...prev, status }));
    });
  };

  const handleAddNote = () => {
    addNote(token, ticketId, { content: noteContent }).then((newNote) => {
      setNotes((prev) => [...prev, newNote]);
      setNoteContent('');
    });
  };

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Details</h2>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-lg font-medium text-gray-700">Title: {ticket.title}</p>
        <p className="text-gray-600 mt-2">Status: {ticket.status}</p>
        <p className="text-gray-600 mt-2">Description: {ticket.description}</p>
      </div>

      <div className="mt-6">
        <label className="block font-semibold text-gray-700">Update Status</label>
        <select
          className="mt-2 p-2 border rounded w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={handleStatusUpdate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Update Status
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="bg-white p-3 rounded shadow">
              {note.content}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full p-3 border rounded"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note..."
        />
        <button onClick={handleAddNote} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
          Add Note
        </button>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
