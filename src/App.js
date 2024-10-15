// src/App.js
import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';
import './App.css';
import { db } from './firebase';  // Import Firebase
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from Firestore on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(notesData);
    };

    fetchNotes();
  }, []);

  const addNote = async (text) => {
    const newNote = { text };
    const docRef = await addDoc(collection(db, "notes"), newNote);
    setNotes([...notes, { ...newNote, id: docRef.id }]);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Simple Notes App v2</h1>
      <NoteForm addNote={addNote} />
      <div className="notes-list">
        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
