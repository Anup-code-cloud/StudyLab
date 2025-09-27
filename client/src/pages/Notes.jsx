// pages/NotesPage.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Example notes data (temporary, will reset on refresh)
const notesData = {
  "12TH NOTES": [
    { title: "Physics Formula Sheet", desc: "Quick revision formulas for Class 12 Physics", file: "#" },
    { title: "Chemistry Reactions PDF", desc: "Important reactions & equations", file: "#" },
  ],
  "B.TECH": [
    { title: "Computer Architecture", desc: "4th Sem COA notes", file: "#" },
    { title: "DBMS", desc: "ER Diagrams & SQL notes", file: "#" },
  ],
};

function NotesPage({ category }) {
  const location = useLocation();
  const selectedCategory = category || location.pathname.replace("/", "").toUpperCase();

  const [notes, setNotes] = useState(notesData[selectedCategory] || []);
  const [newNote, setNewNote] = useState({ title: "", desc: "", file: "" });

  // Handle input change
  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim() && newNote.desc.trim()) {
      setNotes([...notes, newNote]);
      setNewNote({ title: "", desc: "", file: "" });
      alert("✅ Note uploaded successfully!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">{selectedCategory}</h1>
        <p className="text-gray-600">Explore and upload study notes for {selectedCategory}</p>
      </header>

      {/* Notes Grid */}
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
              <p className="text-gray-600 mt-2">{note.desc}</p>
              {note.file && (
                <a
                  href={note.file}
                  className="inline-block mt-3 text-blue-500 hover:underline"
                >
                  📥 Download
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-10">
          No notes available for {selectedCategory}.
        </p>
      )}

      {/* Upload Notes Form */}
      <section className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📤 Upload Your Notes</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={newNote.title}
            onChange={handleChange}
            placeholder="Enter note title"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="desc"
            value={newNote.desc}
            onChange={handleChange}
            placeholder="Enter description"
            rows="3"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="url"
            name="file"
            value={newNote.file}
            onChange={handleChange}
            placeholder="Enter file link (Google Drive, PDF, etc.)"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Upload Note
          </button>
        </form>
      </section>

      {/* Back to Home */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="px-5 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotesPage;
