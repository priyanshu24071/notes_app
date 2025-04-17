import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../redux/slices/notesSlice';
import { logout } from '../redux/slices/authSlice';
import axios from 'axios';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: notes, loading, error } = useSelector((state) => state.notes);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }
    setCreating(true);
    try {
      await axios.post(
        '/api/notes',
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTitle('');
      setContent('');
      dispatch(fetchNotes());
    } catch (err) {
      alert('Error adding note');
    }
    setCreating(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <button onClick={() => dispatch(logout())} className="bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>
      </div>

      {/* Note Addition Form */}
      <form onSubmit={handleAddNote} className="mb-6">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={creating}>
          {creating ? 'Adding...' : 'Add Note'}
        </button>
      </form>

      {loading && <p>Loading notes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="border p-3 mb-2 rounded shadow">
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      ) : (
        !loading && <p>No notes available. Add a new note above!</p>
      )}
    </div>
  );
}
