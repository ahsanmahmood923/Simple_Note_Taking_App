const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Note = require('./models/Note'); // Import the Note model

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Connect to MongoDB (replace with your local or Atlas connection string)
mongoose.connect('mongodb://localhost:27017/simple_notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Route to create a note
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();
    res.status(201).json(newNote); // Respond with the newly created note
  } catch (err) {
    res.status(400).json({ error: 'Error creating note' });
  }
});

// Route to get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes); // Respond with all notes
  } catch (err) {
    res.status(400).json({ error: 'Error fetching notes' });
  }
});

// Route to delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).send('Note deleted');
  } catch (err) {
    res.status(400).json({ error: 'Error deleting note' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
