// src/NoteForm.js
import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm({ addNote }) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      addNote(noteText);
      setNoteText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
