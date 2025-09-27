// pages/SSC.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Bookmark, BookmarkPlus, Download, FileText, Sun, Moon, 
  CheckCircle, BookOpen, Brain, Target, BarChart3, Clock, Award,
  ChevronDown, ChevronUp, Play, Library, Notebook, Users, Video,
  Calendar, FileCheck, PieChart, RotateCcw, HelpCircle, X
} from "lucide-react";

const sscData = {
  subjects: [
    { 
      id: "gk", 
      name: "General Knowledge", 
      color: "bg-blue-500",
      icon: <Target className="w-5 h-5" />,
      chapters: [
        { name: "History", topics: ["Ancient India", "Medieval India", "Modern India"], resources: 10, completed: 6 },
        { name: "Geography", topics: ["Physical Geography", "Indian Geography", "World Geography"], resources: 8, completed: 4 },
        { name: "Polity", topics: ["Constitution", "Governance", "Rights"], resources: 6, completed: 3 },
      ]
    },
    { 
      id: "qa", 
      name: "Quantitative Aptitude", 
      color: "bg-green-500",
      icon: <Library className="w-5 h-5" />,
      chapters: [
        { name: "Arithmetic", topics: ["Percentages", "Profit & Loss", "Simple Interest", "Time & Work"], resources: 12, completed: 7 },
        { name: "Algebra", topics: ["Equations", "Inequalities", "Polynomials"], resources: 8, completed: 4 },
        { name: "Geometry & Mensuration", topics: ["Triangles", "Circles", "Mensuration"], resources: 10, completed: 5 },
      ]
    },
    { 
      id: "eng", 
      name: "English", 
      color: "bg-purple-500",
      icon: <Brain className="w-5 h-5" />,
      chapters: [
        { name: "Grammar", topics: ["Tenses", "Parts of Speech", "Articles"], resources: 8, completed: 5 },
        { name: "Vocabulary", topics: ["Synonyms", "Antonyms", "Idioms & Phrases"], resources: 6, completed: 3 },
        { name: "Comprehension", topics: ["Reading Comprehension", "Para Jumbles"], resources: 5, completed: 2 },
      ]
    },
    { 
      id: "reasoning", 
      name: "Reasoning", 
      color: "bg-yellow-500",
      icon: <Users className="w-5 h-5" />,
      chapters: [
        { name: "Logical Reasoning", topics: ["Analogy", "Classification", "Series"], resources: 10, completed: 6 },
        { name: "Analytical Reasoning", topics: ["Puzzle", "Seating Arrangement", "Syllogism"], resources: 12, completed: 8 },
      ]
    },
  ],
  formulas: [
    { subject: "Quantitative Aptitude", list: [
      { formula: "SI = P*R*T/100", description: "Simple Interest" },
      { formula: "CI = P(1+R/100)^T", description: "Compound Interest" },
      { formula: "Speed = Distance / Time", description: "Speed formula" },
    ]}
  ],
  resources: {
    notes: [
      { title: "SSC General Knowledge Notes", subject: "GK", type: "PDF", link: "#", pages: 50, rating: 4.7 },
      { title: "Quantitative Aptitude Notes", subject: "QA", type: "PDF", link: "#", pages: 40, rating: 4.6 },
    ],
    books: [
      { title: "Lucent GK", subject: "GK", type: "Book", link: "#", author: "Lucent", year: 2023 },
      { title: "R S Aggarwal", subject: "QA", type: "Book", link: "#", author: "R S Aggarwal", year: 2023 },
    ],
    videos: [
      { title: "SSC Math Tricks", subject: "QA", type: "Video", link: "#", duration: "2h", views: "30K" },
      { title: "SSC GK Crash Course", subject: "GK", type: "Video", link: "#", duration: "1h 45m", views: "25K" },
    ],
    practice: [
      { title: "SSC Previous Year Papers", subject: "All", type: "Practice", link: "#", questions: 2500 },
      { title: "Chapter-wise MCQs", subject: "All", type: "Practice", link: "#", questions: 1500 },
    ]
  },
  quizzes: [
    { 
      subject: "Quantitative Aptitude", icon: <Target className="w-5 h-5" />, 
      questions: [
        { q: "SI of 1000 at 5% for 2 years?", options: ["100", "150", "200"], answer: "100", explanation: "SI = 1000*5*2/100 = 100" }
      ]
    },
    { 
      subject: "General Knowledge", icon: <BookOpen className="w-5 h-5" />, 
      questions: [
        { q: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata"], answer: "Delhi", explanation: "Delhi is the capital of India." }
      ]
    }
  ],
  studyPlan: [
    { day: "Monday", subjects: ["Quantitative Aptitude", "English"], topics: ["Arithmetic", "Grammar"], duration: "3h" },
    { day: "Tuesday", subjects: ["General Knowledge", "Reasoning"], topics: ["History", "Logical Reasoning"], duration: "2.5h" },
    { day: "Wednesday", subjects: ["Quantitative Aptitude", "Reasoning"], topics: ["Algebra", "Puzzle"], duration: "3h" },
  ]
};

export default function SSC() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("syllabus");
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [quizState, setQuizState] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [resourceCategory, setResourceCategory] = useState("notes");
  const [showQuizExplanation, setShowQuizExplanation] = useState({});
  const [activeDay, setActiveDay] = useState("Monday");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleBookmark = (itemId) => {
    setBookmarks(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const handleQuizAnswer = (subject, qIndex, selected) => {
    setQuizState(prev => ({ 
      ...prev, 
      [subject]: { 
        ...prev[subject], 
        [qIndex]: selected 
      } 
    }));
  };

  const toggleChapter = (subjectId, chapterIndex) => {
    const key = `${subjectId}-${chapterIndex}`;
    setExpandedChapters(prev => ({ 
      ...prev, 
      [key]: !prev[key] 
    }));
  };

  const toggleExplanation = (subject, qIndex) => {
    const key = `${subject}-${qIndex}`;
    setShowQuizExplanation(prev => ({ 
      ...prev, 
      [key]: !prev[key] 
    }));
  };

  const resetQuiz = (subject) => {
    setQuizState(prev => { 
      const newState = {...prev}; 
      delete newState[subject]; 
      return newState; 
    });
  };

  const filteredSubjects = sscData.subjects.map(subject => ({
    ...subject,
    chapters: subject.chapters
      .map(chapter => ({
        ...chapter,
        topics: chapter.topics.filter(topic => 
          topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(chapter => 
        chapter.topics.length > 0 || 
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  })).filter(subject => subject.chapters.length > 0);

  const calculateSubjectProgress = (subjectId) => {
    const subject = sscData.subjects.find(s => s.id === subjectId);
    if (!subject) return 0;
    let totalResources = 0, completedResources = 0;
    subject.chapters.forEach(ch => { 
      totalResources += ch.resources; 
      completedResources += ch.completed; 
    });
    return totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0;
  };

  const downloadAll = (category) => {
    sscData.resources[category].forEach(res => {
      if (res.link && res.link !== "#") {
        window.open(res.link, "_blank");
      }
    });
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 max-w-7xl mx-auto transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">SSC Prep Master</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Your complete SSC preparation guide</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="relative w-full max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search chapters, topics..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm" 
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2">
        {["syllabus", "resources", "formulas", "quizzes", "studyPlan"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {tab === "syllabus" ? "Syllabus" :
             tab === "resources" ? "Resources" :
             tab === "formulas" ? "Formulas" :
             tab === "quizzes" ? "Quizzes" : "Study Plan"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === "syllabus" && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <div key={subject.id} className="border rounded-xl p-4 shadow-sm dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={subject.color + " p-2 rounded-full text-white"}>
                          {subject.icon}
                        </span>
                        <h2 className="text-xl font-semibold">{subject.name}</h2>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{calculateSubjectProgress(subject.id)}% Completed</span>
                    </div>

                    <div className="space-y-2">
                      {subject.chapters.map((chapter, idx) => (
                        <div key={idx}>
                          <button
                            onClick={() => toggleChapter(subject.id, idx)}
                            className="w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          >
                            <span className="font-medium">{chapter.name}</span>
                            {expandedChapters[`${subject.id}-${idx}`] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <AnimatePresence>
                            {expandedChapters[`${subject.id}-${idx}`] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-4 md:pl-6 mt-1 space-y-1 overflow-hidden"
                              >
                                {chapter.topics.map((topic, tIdx) => {
                                  const topicId = `topic-${subject.id}-${idx}-${tIdx}`;
                                  return (
                                    <div key={tIdx} className="flex justify-between items-center py-1">
                                      <span className="text-sm">• {topic}</span>
                                      <button
                                        onClick={() => toggleBookmark(topicId)}
                                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        aria-label="Bookmark topic"
                                      >
                                        {bookmarks.includes(topicId) ? 
                                          <BookmarkPlus className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : 
                                          <Bookmark className="w-4 h-4" />
                                        }
                                      </button>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No results found for "{searchTerm}"
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Resource Category Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                {["notes", "books", "videos", "practice"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setResourceCategory(cat)}
                    className={`px-3 py-1 rounded-full font-semibold transition whitespace-nowrap ${
                      resourceCategory === cat
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
                <button 
                  onClick={() => downloadAll(resourceCategory)} 
                  className="ml-auto px-3 py-1 rounded-full bg-green-500 text-white font-semibold whitespace-nowrap"
                >
                  Download All
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sscData.resources[resourceCategory].map((res, idx) => (
                  <div key={idx} className="border rounded-xl p-4 shadow-sm dark:border-gray-700 flex flex-col gap-2">
                    <h3 className="font-semibold">{res.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {res.subject} • {res.type} {res.pages ? `• ${res.pages} pages` : ""} {res.duration ? `• ${res.duration}` : ""}
                    </p>
                    {res.author && <p className="text-sm text-gray-500 dark:text-gray-400">Author: {res.author} ({res.year})</p>}
                    {res.views && <p className="text-sm text-gray-500 dark:text-gray-400">Views: {res.views}</p>}
                    {res.questions && <p className="text-sm text-gray-500 dark:text-gray-400">Questions: {res.questions}</p>}
                    <a href={res.link} target="_blank" rel="noopener noreferrer" className="mt-2 px-3 py-1 rounded-lg bg-blue-500 text-white text-sm text-center hover:bg-blue-600 transition">
                      Open
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "formulas" && (
            <motion.div 
              key="formulas" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {sscData.formulas.map((f, idx) => (
                <div key={idx} className="border rounded-xl p-4 shadow-sm dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-2">{f.subject}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {f.list.map((formula, fIdx) => (
                      <li key={fIdx} className="pl-2">
                        <strong className="font-mono">{formula.formula}</strong> - {formula.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "quizzes" && (
            <motion.div 
              key="quizzes" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              {sscData.quizzes.map((quiz, idx) => (
                <div key={idx} className="border rounded-xl p-4 shadow-sm dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      {quiz.icon}
                    </span>
                    <h2 className="text-xl font-semibold">{quiz.subject}</h2>
                    <button 
                      onClick={() => resetQuiz(quiz.subject)} 
                      className="ml-auto text-sm text-red-500 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                  </div>
                  <div className="space-y-4">
                    {quiz.questions.map((q, qIdx) => {
                      const userAnswer = quizState[quiz.subject]?.[qIdx];
                      const isCorrect = userAnswer === q.answer;
                      const explanationKey = `${quiz.subject}-${qIdx}`;
                      
                      return (
                        <div key={qIdx} className="space-y-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <p className="font-semibold">{q.q}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => handleQuizAnswer(quiz.subject, qIdx, opt)}
                                disabled={userAnswer !== undefined}
                                className={`px-3 py-2 rounded-lg border transition ${
                                  userAnswer === opt
                                    ? isCorrect
                                      ? "bg-green-500 text-white border-green-500"
                                      : "bg-red-500 text-white border-red-500"
                                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                } ${userAnswer !== undefined && opt === q.answer ? "ring-2 ring-green-500" : ""}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {userAnswer !== undefined && (
                            <div className="mt-2">
                              <button 
                                onClick={() => toggleExplanation(quiz.subject, qIdx)}
                                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                              >
                                {showQuizExplanation[explanationKey] ? 
                                  <ChevronUp className="w-4 h-4" /> : 
                                  <ChevronDown className="w-4 h-4" />
                                }
                                {showQuizExplanation[explanationKey] ? "Hide Explanation" : "Show Explanation"}
                              </button>
                              {showQuizExplanation[explanationKey] && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                  {q.explanation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "studyPlan" && (
            <motion.div 
              key="studyPlan" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                {sscData.studyPlan.map(plan => (
                  <button
                    key={plan.day}
                    onClick={() => setActiveDay(plan.day)}
                    className={`px-3 py-1 rounded-full font-semibold transition whitespace-nowrap ${
                      activeDay === plan.day
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {plan.day}
                  </button>
                ))}
              </div>
              <div className="border rounded-xl p-4 shadow-sm dark:border-gray-700">
                {sscData.studyPlan.filter(plan => plan.day === activeDay).map(plan => (
                  <div key={plan.day} className="space-y-3">
                    <h2 className="text-xl font-semibold">{plan.day}</h2>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <p><strong>Subjects:</strong> {plan.subjects.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <p><strong>Topics:</strong> {plan.topics.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <p><strong>Duration:</strong> {plan.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}