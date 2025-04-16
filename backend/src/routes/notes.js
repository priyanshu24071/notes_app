import express from 'express';
import Note from '../models/Note.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 
import { apiLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.use(authMiddleware, apiLimiter);

// Create
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      userId: req.user.userId
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

export default router;
