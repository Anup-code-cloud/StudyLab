import { useState } from "react";
import { useParams } from "react-router-dom";
import { NOTES_DATA } from "../data/notesData";
import NotesGrid from "../components/NotesGrid";

function NotesPage() {
  const { category } = useParams();
  const [refresh, setRefresh] = useState(0);

  const formatted = category.toUpperCase();
  const data = NOTES_DATA.find((c) => c.category.toUpperCase().includes(formatted));

  if (!data) return <h1>No notes found for {category}</h1>;

  return (
    <main className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{data.category}</h1>
        <button
          onClick={() => setRefresh(refresh + 1)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          🔄 Refresh
        </button>
      </div>
      <NotesGrid key={refresh} notes={data.subjects} />
    </main>
  );
}
