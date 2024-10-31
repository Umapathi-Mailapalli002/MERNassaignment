// /components/NoteList.jsx
import React from 'react';

const NoteList = ({ notes }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-600">No notes available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notes.map((note) => (
            <li key={note.id} className="py-4 text-gray-800">
              {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
