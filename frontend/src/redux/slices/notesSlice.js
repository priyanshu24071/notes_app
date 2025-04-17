import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { getState }) => {
  const { token } = getState().auth;
  const res = await axios.get('/api/notes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch notes';
      });
  },
});

export default notesSlice.reducer;
