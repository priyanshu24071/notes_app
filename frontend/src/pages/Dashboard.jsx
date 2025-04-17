import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from '../redux/slices/notesSlice';
import { logout } from '../redux/slices/authSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: notes, loading } = useSelector((s) => s.notes);

  // form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
        alert('Please fill in both title and content');
        return;
      }
    if (editId) {
      dispatch(updateNote({ id: editId, data: { title, content } }));
    } else {
      dispatch(addNote({ title, content }));
    }
    resetForm();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add / Edit form */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-8">
        <input
          className="border rounded w-full p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded w-full p-2"
          rows="3"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="space-x-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            {editId ? 'Save' : 'Add'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm underline"
            >
              cancel
            </button>
          )}
        </div>
      </form>

      {loading && <p className="text-gray-500">loading…</p>}

      {notes.map((n) => (
        <div
          key={n._id}
          className="border rounded p-3 mb-3 hover:shadow transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{n.title}</h2>
              <p className="whitespace-pre-wrap">{n.content}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => {
                  setEditId(n._id);
                  setTitle(n.title);
                  setContent(n.content);
                }}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteNote(n._id))}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
