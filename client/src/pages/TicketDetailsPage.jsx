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
  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketData = await getTicketById(ticketId, token);
        console.log(ticketData)
        setTicket(ticketData.data);
        setStatus(ticketData.data.status);
      } catch (err) {
        setError('Error fetching ticket details');
      } finally {
        setLoading(false);
      }
    };

    
    fetchTicket();
    fetchNotes();
  }, [ticketId, token]);

  const fetchNotes = async () => {
    setNotesLoading(true); // Start loading notes
    try {
      const notesData = await getNotesForTicket(token, ticketId);
      console.log(notesData);
      setNotes(notesData.data);
    } catch (err) {
      setError('Error fetching notes');
    } finally {
      setNotesLoading(false); // End loading notes
    }
  };

  const handleStatusUpdate = async () => {
    if (window.confirm("Are you sure you want to update the status?")) {
      try {
        await updateTicketStatus(token, ticketId, { status });
        setTicket((prev) => ({ ...prev, status }));
        setSuccessMessage('Status updated successfully');
      } catch (err) {
        setError('Error updating status');
      }
    }
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) return; // Prevent empty notes
    try {
      const newNote = await addNote(token, ticketId, { content: noteContent });
      setNotes((prev) => [...prev, newNote]);
      setNoteContent('');
      fetchNotes();
      setSuccessMessage('Note added successfully');
    } catch (err) {
      setError('Error adding note');
    }
  };

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
        <button onClick={handleStatusUpdate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Update Status
        </button>
      </div>

      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
        {notesLoading ? (
          <p>Loading notes...</p>
        ) : (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note._id} className="bg-white p-3 rounded shadow flex justify-between">
                {note.content}
                <span className='text-gray-400 text-xs'><i>by {note.addedBy.username}</i></span>
              </li>
            ))}
          </ul>
        )}
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
