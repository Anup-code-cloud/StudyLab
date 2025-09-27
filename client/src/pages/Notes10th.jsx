import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Bookmark, Download } from "lucide-react";

const subjectsData = [
  {
    name: "Mathematics",
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Circles",
      "Probability"
    ]
  },
  {
    name: "Science",
    chapters: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-Metals",
      "Carbon and its Compounds",
      "Periodic Classification of Elements",
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity and Evolution",
      "Light – Reflection and Refraction"
    ]
  },
  {
    name: "Social Science",
    chapters: [
      "History: The Rise of Nationalism",
      "Geography: Resources and Development",
      "Civics: Democracy and Government",
      "Economics: Development"
    ]
  },
  {
    name: "English",
    chapters: [
      "Two Gentlemen of Verona",
      "The Diary of Anne Frank",
      "The Story of My Life",
      "Rain on the Roof",
      "The Adventure of Toto"
    ]
  },
  {
    name: "Hindi",
    chapters: [
      "साँचे और बूँदें",
      "पंचतंत्र की कहानियाँ",
      "स्वतंत्रता संग्राम की कहानियाँ",
      "काव्य और निबंध संग्रह"
    ]
  }
];

export default function Note10th() {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredSubjects = subjectsData.map(subject => ({
    ...subject,
    chapters: subject.chapters.filter(chapter =>
      chapter.toLowerCase().includes(search.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">10th Class Notes</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search chapters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded shadow-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
      />

      <div className="space-y-4">
        {filteredSubjects.map((subject, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="font-semibold text-gray-800 dark:text-gray-200">{subject.name}</span>
              {expanded === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            <AnimatePresence>
              {expanded === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2 space-y-2"
                >
                  {subject.chapters.length > 0 ? (
                    subject.chapters.map((chapter, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <span>{chapter}</span>
                        <div className="flex space-x-2">
                          <button title="Bookmark">
                            <Bookmark className="w-5 h-5 text-indigo-500" />
                          </button>
                          <button title="Download">
                            <Download className="w-5 h-5 text-green-500" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 px-3 py-2">No chapters found</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
