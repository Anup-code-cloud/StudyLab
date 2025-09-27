import { useState } from "react";

function NotesGrid({ notes }) {
  const [preview, setPreview] = useState(null);

  return (
    <section className="notes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note, idx) => (
        <article
          key={idx}
          className="bg-gray-800 rounded-2xl p-4 shadow hover:scale-105 transition"
        >
          <span className="pill bg-blue-400 text-black px-2 py-1 rounded-full text-xs font-bold">
            {note.pages} pages
          </span>
          <h3 className="text-lg font-bold mt-2">{note.name}</h3>
          <p className="text-gray-400">⭐ {note.rating}/5</p>
          <div className="flex gap-2 mt-3">
            <button
              className="btn bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => setPreview(note)}
            >
              Preview
            </button>
            <a
              href={note.file}
              download
              className="btn bg-green-600 text-white px-3 py-1 rounded"
            >
              Download
            </a>
          </div>
        </article>
      ))}

      {/* PDF Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 h-3/4 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2">
              <h2>{preview.name}</h2>
              <button onClick={() => setPreview(null)}>✕</button>
            </div>
            <iframe src={preview.file} title="PDF Preview" className="w-full h-full" />
          </div>
        </div>
      )}
    </section>
  );
}

export default NotesGrid;
