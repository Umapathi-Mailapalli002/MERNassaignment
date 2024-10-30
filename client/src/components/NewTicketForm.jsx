import React,{ useState } from 'react';

function NewTicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Raise a Ticket</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Submit Ticket
      </button>
    </form>
  );
}

export default NewTicketForm;
