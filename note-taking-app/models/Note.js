const mongoose = require('mongoose');

// Create a Schema for the note
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // title is required
  },
  content: {
    type: String,
    required: true,  // content is required
  },
  createdAt: {
    type: Date,
    default: Date.now,  // automatically set creation date to now
  },
});

// Create a model from the schema
const Note = mongoose.model('Note', noteSchema);

// Export the model
module.exports = Note;
