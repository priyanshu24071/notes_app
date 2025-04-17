import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authHeaders = (getState) => ({
  headers: { Authorization: 'Bearer ' + getState().auth.token },
});

/* ── Thunks ────────────────────────────────────────── */
export const fetchNotes = createAsyncThunk(
  'notes/fetch',
  async (_, { getState }) => {
    const res = await axios.get('/api/notes', authHeaders(getState));
    return res.data;
  }
);

export const addNote = createAsyncThunk(
  'notes/add',
  async (note, { getState }) => {
    const res = await axios.post('/api/notes', note, authHeaders(getState));
    return res.data;
  }
);

export const updateNote = createAsyncThunk(
  'notes/update',
  async ({ id, data }, { getState }) => {
    const res = await axios.put(`/api/notes/${id}`, data, authHeaders(getState));
    return res.data;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { getState }) => {
    await axios.delete(`/api/notes/${id}`, authHeaders(getState));
    return id;
  }
);

/* ── Slice ─────────────────────────────────────────── */
const slice = createSlice({
  name: 'notes',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(fetchNotes.pending, (s) => { s.loading = true; })
      .addCase(fetchNotes.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchNotes.rejected, (s) => { s.loading = false; s.error = 'Fetch failed'; })

      .addCase(addNote.fulfilled, (s, a) => { s.list.unshift(a.payload); })

      .addCase(updateNote.fulfilled, (s, a) => {
        const i = s.list.findIndex((n) => n._id === a.payload._id);
        if (i > -1) s.list[i] = a.payload;
      })

      .addCase(deleteNote.fulfilled, (s, a) => {
        s.list = s.list.filter((n) => n._id !== a.payload);
      }),
});

export default slice.reducer;
