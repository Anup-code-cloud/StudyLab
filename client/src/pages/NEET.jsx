// pages/NEET.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Bookmark, BookmarkPlus, Download, FileText, Sun, Moon, 
  CheckCircle, BookOpen, Brain, Target, BarChart3, Clock, Award,
  ChevronDown, ChevronUp, Play, Library, Notebook, Users, Video,
  Calendar, FileCheck, PieChart, RotateCcw, HelpCircle, X
} from "lucide-react";

const neetData = {
  subjects: [
    { 
      id: "physics", 
      name: "Physics", 
      color: "bg-blue-500",
      icon: <Target className="w-5 h-5" />,
      chapters: [
        { 
          name: "Mechanics", 
          topics: ["Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation"],
          resources: 12,
          completed: 8
        },
        { 
          name: "Optics", 
          topics: ["Ray Optics", "Wave Optics", "Optical Instruments"],
          resources: 8,
          completed: 3
        },
        { 
          name: "Thermodynamics", 
          topics: ["Thermal Properties", "Kinetic Theory of Gases", "Thermodynamics"],
          resources: 6,
          completed: 2
        },
        { 
          name: "Electrodynamics", 
          topics: ["Electrostatics", "Current Electricity", "Magnetic Effects", "EMI", "AC"],
          resources: 10,
          completed: 5
        },
      ]
    },
    { 
      id: "chemistry", 
      name: "Chemistry", 
      color: "bg-green-500",
      icon: <Library className="w-5 h-5" />,
      chapters: [
        { 
          name: "Organic Chemistry", 
          topics: ["Basic Concepts", "Hydrocarbons", "Organic Compounds", "Biomolecules"],
          resources: 15,
          completed: 10
        },
        { 
          name: "Inorganic Chemistry", 
          topics: ["Classification", "Periodicity", "Coordination Compounds"],
          resources: 12,
          completed: 7
        },
        { 
          name: "Physical Chemistry", 
          topics: ["States of Matter", "Atomic Structure", "Chemical Bonding", "Thermodynamics"],
          resources: 10,
          completed: 6
        },
      ]
    },
    { 
      id: "biology", 
      name: "Biology", 
      color: "bg-purple-500",
      icon: <Brain className="w-5 h-5" />,
      chapters: [
        { 
          name: "Botany", 
          topics: ["Plant Physiology", "Plant Kingdom", "Morphology", "Ecology"],
          resources: 20,
          completed: 15
        },
        { 
          name: "Zoology", 
          topics: ["Animal Kingdom", "Human Physiology", "Reproduction", "Genetics"],
          resources: 18,
          completed: 12
        },
        { 
          name: "Human Physiology", 
          topics: ["Digestion", "Respiration", "Circulation", "Excretion", "Neural Control"],
          resources: 15,
          completed: 9
        },
        { 
          name: "Genetics and Evolution", 
          topics: ["Principles of Inheritance", "Molecular Basis", "Evolution"],
          resources: 10,
          completed: 7
        },
      ]
    },
  ],
  formulas: [
    { 
      subject: "Physics", 
      list: [
        { formula: "v = u + at", description: "First equation of motion" },
        { formula: "F = ma", description: "Newton's second law" },
        { formula: "E = mc²", description: "Mass-energy equivalence" },
        { formula: "P = VI", description: "Electrical power" },
      ] 
    },
    { 
      subject: "Chemistry", 
      list: [
        { formula: "Molarity = moles/L", description: "Concentration formula" },
        { formula: "PV = nRT", description: "Ideal gas law" },
        { formula: "pH = -log[H⁺]", description: "pH calculation" },
      ] 
    },
    { 
      subject: "Biology", 
      list: [
        { formula: "p² + 2pq + q² = 1", description: "Hardy-Weinberg principle" },
        { formula: "Rate = k[A][B]", description: "Rate equation" },
      ] 
    },
  ],
  resources: {
    notes: [
      { title: "Complete Physics Notes", subject: "Physics", type: "PDF", link: "#", pages: 45, rating: 4.8 },
      { title: "Organic Chemistry Revision", subject: "Chemistry", type: "PDF", link: "#", pages: 32, rating: 4.5 },
      { title: "Human Physiology Diagrams", subject: "Biology", type: "PDF", link: "#", pages: 28, rating: 4.7 },
    ],
    books: [
      { title: "NCERT Physics Class XI", subject: "Physics", type: "Book", link: "#", author: "NCERT", year: 2022 },
      { title: "NCERT Chemistry Class XII", subject: "Chemistry", type: "Book", link: "#", author: "NCERT", year: 2022 },
      { title: "Biology NCERT Set", subject: "Biology", type: "Book Set", link: "#", author: "NCERT", year: 2022 },
    ],
    videos: [
      { title: "Mechanics Crash Course", subject: "Physics", type: "Video", link: "#", duration: "2h 15m", views: "45K" },
      { title: "Organic Chemistry Reactions", subject: "Chemistry", type: "Video", link: "#", duration: "1h 45m", views: "38K" },
      { title: "Genetics Simplified", subject: "Biology", type: "Video", link: "#", duration: "3h 05m", views: "52K" },
    ],
    practice: [
      { title: "Previous Year Papers (2010-2022)", subject: "All", type: "Practice", link: "#", questions: 3000 },
      { title: "Chapter-wise MCQs", subject: "All", type: "Practice", link: "#", questions: 1500 },
      { title: "Mock Test Series", subject: "All", type: "Test", link: "#", tests: 15 },
    ]
  },
  quizzes: [
    { 
      subject: "Physics", 
      icon: <Target className="w-5 h-5" />,
      questions: [
        { 
          q: "What is the formula for velocity?", 
          options: ["v = u + at", "F = ma", "E = mc^2"], 
          answer: "v = u + at",
          explanation: "This is the first equation of motion, where v is final velocity, u is initial velocity, a is acceleration, and t is time."
        },
        { 
          q: "Unit of force?", 
          options: ["Newton", "Joule", "Watt"], 
          answer: "Newton",
          explanation: "Force is measured in Newtons, named after Sir Isaac Newton."
        }
      ] 
    },
    { 
      subject: "Chemistry", 
      icon: <Library className="w-5 h-5" />,
      questions: [
        { 
          q: "Molarity formula?", 
          options: ["Moles/L", "PV=nRT", "pH = -log[H⁺]"], 
          answer: "Moles/L",
          explanation: "Molarity is defined as the number of moles of solute per liter of solution."
        }
      ]
    },
    { 
      subject: "Biology", 
      icon: <Brain className="w-5 h-5" />,
      questions: [
        { 
          q: "Hardy-Weinberg equation?", 
          options: ["p² + 2pq + q² = 1", "F = ma", "E = mc²"], 
          answer: "p² + 2pq + q² = 1",
          explanation: "The Hardy-Weinberg principle states that allele frequencies in a population remain constant from generation to generation in the absence of evolutionary influences."
        }
      ]
    }
  ],
  studyPlan: [
    { day: "Monday", subjects: ["Physics", "Chemistry"], topics: ["Mechanics", "Organic Chemistry"], duration: "3h" },
    { day: "Tuesday", subjects: ["Biology", "Physics"], topics: ["Genetics", "Optics"], duration: "2.5h" },
    { day: "Wednesday", subjects: ["Chemistry", "Biology"], topics: ["Inorganic Chemistry", "Human Physiology"], duration: "3h" },
    { day: "Thursday", subjects: ["Physics", "Biology"], topics: ["Electrodynamics", "Botany"], duration: "2.5h" },
    { day: "Friday", subjects: ["Chemistry", "Physics"], topics: ["Physical Chemistry", "Thermodynamics"], duration: "3h" },
    { day: "Saturday", subjects: ["All"], topics: ["Revision", "Mock Test"], duration: "4h" },
    { day: "Sunday", subjects: ["Weak Areas"], topics: ["Practice", "Doubts Clearing"], duration: "2h" },
  ]
};

export default function NEET() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("syllabus");
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState({ Physics: 50, Chemistry: 30, Biology: 70 });
  const [quizState, setQuizState] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [resourceCategory, setResourceCategory] = useState("notes");
  const [showQuizExplanation, setShowQuizExplanation] = useState({});
  const [activeDay, setActiveDay] = useState("Monday");

  useEffect(() => { 
    document.documentElement.classList.toggle("dark", darkMode); 
  }, [darkMode]);

  const toggleBookmark = (item, type) => {
    const id = `${type}-${item}`;
    setBookmarks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleQuizAnswer = (subject, qIndex, selected) => {
    setQuizState(prev => ({
      ...prev,
      [subject]: { ...prev[subject], [qIndex]: selected }
    }));
  };

  const toggleChapter = (subjectId, chapterIndex) => {
    setExpandedChapters(prev => ({
      ...prev,
      [`${subjectId}-${chapterIndex}`]: !prev[`${subjectId}-${chapterIndex}`]
    }));
  };

  const toggleExplanation = (subject, qIndex) => {
    setShowQuizExplanation(prev => ({
      ...prev,
      [`${subject}-${qIndex}`]: !prev[`${subject}-${qIndex}`]
    }));
  };

  const resetQuiz = (subject) => {
    setQuizState(prev => {
      const newState = {...prev};
      delete newState[subject];
      return newState;
    });
  };

  const filteredSubjects = neetData.subjects.map(subject => ({
    ...subject,
    chapters: subject.chapters.map(chapter => ({
      ...chapter,
      topics: chapter.topics.filter(topic => 
        topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(chapter => chapter.topics.length > 0)
  })).filter(subject => subject.chapters.length > 0);

  const downloadAll = (category) => {
    neetData.resources[category].forEach(res => {
      window.open(res.link, "_blank");
    });
  };

  const calculateSubjectProgress = (subjectId) => {
    const subject = neetData.subjects.find(s => s.id === subjectId);
    if (!subject) return 0;
    
    let totalResources = 0;
    let completedResources = 0;
    
    subject.chapters.forEach(chapter => {
      totalResources += chapter.resources;
      completedResources += chapter.completed;
    });
    
    return totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0;
  };

  return (
    <div className={`min-h-screen p-6 max-w-7xl mx-auto transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NEET Prep Master</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Your comprehensive guide to NEET success</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="hidden md:flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Streak: 14 days</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">12h 45m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search chapters, topics, formulas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm"
          />
          <Search className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {[
          { id: "syllabus", label: "Syllabus", icon: <BookOpen className="w-4 h-4" /> },
          { id: "formulas", label: "Formulas", icon: <Notebook className="w-4 h-4" /> },
          { id: "resources", label: "Resources", icon: <FileText className="w-4 h-4" /> },
          { id: "progress", label: "Progress", icon: <BarChart3 className="w-4 h-4" /> },
          { id: "quizzes", label: "Quizzes", icon: <HelpCircle className="w-4 h-4" /> },
          { id: "studyplan", label: "Study Plan", icon: <Calendar className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === tab.id ? 
              "bg-blue-500 text-white shadow-md" : 
              "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="mb-12">
        <AnimatePresence mode="wait">
          {/* Syllabus Tab */}
          {activeTab === "syllabus" && (
            <motion.div 
              key="syllabus" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSubjects.length > 0 ? filteredSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${subject.color} text-white`}>
                      {subject.icon}
                    </div>
                    <h2 className="text-xl font-bold">{subject.name}</h2>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {calculateSubjectProgress(subject.id)}%
                      </span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${subject.color} transition-all`} 
                          style={{ width: `${calculateSubjectProgress(subject.id)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {subject.chapters.map((chapter, cIdx) => (
                      <div key={cIdx} className="border rounded-lg dark:border-gray-700 overflow-hidden">
                        <button 
                          onClick={() => toggleChapter(subject.id, cIdx)}
                          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                          <div className="text-left">
                            <h3 className="font-semibold">{chapter.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {chapter.completed}/{chapter.resources} topics completed
                            </p>
                          </div>
                          {expandedChapters[`${subject.id}-${cIdx}`] ? 
                            <ChevronUp className="w-5 h-5" /> : 
                            <ChevronDown className="w-5 h-5" />
                          }
                        </button>
                        
                        {expandedChapters[`${subject.id}-${cIdx}`] && (
                          <div className="p-3 bg-gray-50 dark:bg-gray-750 border-t dark:border-gray-700">
                            <h4 className="font-medium mb-2 text-sm">Topics:</h4>
                            <ul className="space-y-2">
                              {chapter.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="flex justify-between items-center text-sm">
                                  <span>{topic}</span>
                                  <button 
                                    onClick={() => toggleBookmark(topic, 'topic')}
                                    className="p-1 hover:text-yellow-500 transition-colors"
                                  >
                                    {bookmarks.includes(`topic-${topic}`) ? 
                                      <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : 
                                      <BookmarkPlus className="w-4 h-4" />
                                    }
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 flex justify-between items-center">
                              <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                                <Play className="w-4 h-4" /> Start Learning
                              </button>
                              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1">
                                <FileText className="w-4 h-4" /> Notes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-10">
                  <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">No results found</h3>
                  <p className="text-gray-500 dark:text-gray-500">Try different search terms</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Formulas Tab */}
          {activeTab === "formulas" && (
            <motion.div 
              key="formulas" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {neetData.formulas.map((subject, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {subject.subject === "Physics" ? <Target className="w-5 h-5 text-blue-500" /> : 
                     subject.subject === "Chemistry" ? <Library className="w-5 h-5 text-green-500" /> : 
                     <Brain className="w-5 h-5 text-purple-500" />}
                    {subject.subject} Formulas
                  </h2>
                  <div className="space-y-4">
                    {subject.list.map((formula, fIdx) => (
                      <div key={fIdx} className="p-3 border rounded-lg dark:border-gray-700">
                        <div className="text-lg font-mono font-semibold mb-1">{formula.formula}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{formula.description}</div>
                        <div className="mt-2 flex justify-end">
                          <button 
                            onClick={() => toggleBookmark(formula.formula, 'formula')}
                            className="p-1 hover:text-yellow-500 transition-colors"
                          >
                            {bookmarks.includes(`formula-${formula.formula}`) ? 
                              <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : 
                              <BookmarkPlus className="w-4 h-4" />
                            }
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <motion.div 
              key="resources" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(neetData.resources).map(category => (
                  <button
                    key={category}
                    onClick={() => setResourceCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${resourceCategory === category ? 
                      "bg-blue-500 text-white" : 
                      "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category === "notes" && <FileText className="w-4 h-4" />}
                    {category === "books" && <BookOpen className="w-4 h-4" />}
                    {category === "videos" && <Video className="w-4 h-4" />}
                    {category === "practice" && <FileCheck className="w-4 h-4" />}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {neetData.resources[resourceCategory].map((res, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{res.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                            {res.subject}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{res.type}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleBookmark(res.title, 'resource')}
                        className="p-1 hover:text-yellow-500 transition-colors"
                      >
                        {bookmarks.includes(`resource-${res.title}`) ? 
                          <Bookmark className="w-5 h-5 fill-yellow-400 text-yellow-400" /> : 
                          <BookmarkPlus className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {res.pages && <span>{res.pages} pages</span>}
                      {res.rating && (
                        <div className="flex items-center ml-3">
                          <Award className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{res.rating}</span>
                        </div>
                      )}
                      {res.duration && <span className="ml-3">{res.duration}</span>}
                      {res.views && <span className="ml-3">{res.views} views</span>}
                      {res.questions && <span className="ml-3">{res.questions} questions</span>}
                    </div>
                    
                    <a 
                      href={res.link} 
                      className="w-full bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => downloadAll(resourceCategory)} 
                className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 mx-auto transition-colors"
              >
                <Download className="w-4 h-4" /> 
                Download All {resourceCategory.charAt(0).toUpperCase() + resourceCategory.slice(1)}
              </button>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <motion.div 
              key="progress" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Overall Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {neetData.subjects.map((subject, idx) => {
                    const progress = calculateSubjectProgress(subject.id);
                    return (
                      <div key={idx} className="text-center">
                        <div className="relative inline-block mb-2">
                          <PieChart 
                            className="w-16 h-16" 
                            style={{ 
                              color: subject.color.replace('bg-', ''),
                              strokeDasharray: 100,
                              strokeDashoffset: 100 - progress
                            }} 
                          />
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                            {progress}%
                          </span>
                        </div>
                        <h3 className="font-semibold">{subject.name}</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Detailed Progress</h2>
                <div className="space-y-6">
                  {neetData.subjects.map((subject, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${subject.color} text-white`}>
                          {subject.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{subject.name}</h3>
                        <span className="ml-auto text-sm font-medium">
                          {calculateSubjectProgress(subject.id)}% Complete
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {subject.chapters.map((chapter, cIdx) => {
                          const chapterProgress = Math.round((chapter.completed / chapter.resources) * 100);
                          return (
                            <div key={cIdx}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{chapter.name}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{chapterProgress}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div 
                                  className={`h-2 rounded-full ${subject.color} transition-all`} 
                                  style={{ width: `${chapterProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Quizzes Tab */}
          {activeTab === "quizzes" && (
            <motion.div 
              key="quizzes" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {neetData.quizzes.map((quiz, idx) => {
                  const userAnswers = quizState[quiz.subject] || {};
                  const totalQuestions = quiz.questions.length;
                  const answeredQuestions = Object.keys(userAnswers).length;
                  const score = quiz.questions.reduce((acc, question, qIdx) => {
                    return acc + (userAnswers[qIdx] === question.answer ? 1 : 0);
                  }, 0);
                  
                  return (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                      <div className="flex items-center gap-3 mb-4">
                        {quiz.icon}
                        <h2 className="text-xl font-bold">{quiz.subject} Quiz</h2>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress: {answeredQuestions}/{totalQuestions}</span>
                          <span>Score: {score}/{totalQuestions}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full transition-all" 
                            style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => resetQuiz(quiz.subject)}
                        className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset Quiz
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Practice Questions</h2>
                <div className="space-y-6">
                  {neetData.quizzes.map((quiz, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        {quiz.icon}
                        {quiz.subject}
                      </h3>
                      
                      <div className="space-y-4">
                        {quiz.questions.map((q, qIdx) => {
                          const userAnswer = quizState[quiz.subject]?.[qIdx];
                          const isCorrect = userAnswer === q.answer;
                          
                          return (
                            <div key={qIdx} className="p-4 border rounded-lg dark:border-gray-700">
                              <p className="mb-3 font-medium">{qIdx+1}. {q.q}</p>
                              
                              <div className="grid grid-cols-1 gap-2 mb-4">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = userAnswer === opt;
                                  let buttonClass = "px-3 py-2 rounded-lg text-left border transition-all ";
                                  
                                  if (userAnswer) {
                                    if (opt === q.answer) {
                                      buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 ";
                                    } else if (isSelected && !isCorrect) {
                                      buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 ";
                                    } else {
                                      buttonClass += "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 ";
                                    }
                                  } else {
                                    buttonClass += "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 ";
                                  }
                                  
                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => !userAnswer && handleQuizAnswer(quiz.subject, qIdx, opt)}
                                      className={buttonClass}
                                      disabled={!!userAnswer}
                                    >
                                      {opt} 
                                      {isSelected && isCorrect && <CheckCircle className="inline ml-2 w-4 h-4" />}
                                    </button>
                                  );
                                })}
                              </div>
                              
                              {userAnswer && (
                                <div>
                                  <button 
                                    onClick={() => toggleExplanation(quiz.subject, qIdx)}
                                    className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 mb-2"
                                  >
                                    {showQuizExplanation[`${quiz.subject}-${qIdx}`] ? 
                                      <ChevronUp className="w-4 h-4" /> : 
                                      <ChevronDown className="w-4 h-4" />
                                    }
                                    {showQuizExplanation[`${quiz.subject}-${qIdx}`] ? "Hide Explanation" : "Show Explanation"}
                                  </button>
                                  
                                  {showQuizExplanation[`${quiz.subject}-${qIdx}`] && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                                      {q.explanation}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Study Plan Tab */}
          {activeTab === "studyplan" && (
            <motion.div 
              key="studyplan" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Weekly Study Plan</h2>
                
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {neetData.studyPlan.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDay(day.day)}
                      className={`p-2 rounded-lg text-center transition-all ${activeDay === day.day ? 
                        "bg-blue-500 text-white" : 
                        "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div className="text-xs font-medium">{day.day.slice(0, 3)}</div>
                    </button>
                  ))}
                </div>
                
                {neetData.studyPlan.filter(day => day.day === activeDay).map((day, idx) => (
                  <div key={idx} className="p-4 border rounded-lg dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3">{day.day}'s Study Schedule</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Duration: {day.duration}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Subjects:</h4>
                        <ul className="space-y-1">
                          {day.subjects.map((subject, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                subject === "Physics" ? "bg-blue-500" :
                                subject === "Chemistry" ? "bg-green-500" :
                                subject === "Biology" ? "bg-purple-500" : "bg-gray-500"
                              }`}></div>
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Topics:</h4>
                        <ul className="space-y-1">
                          {day.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <Play className="w-4 h-4" />
                      Start Studying
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Study Recommendations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg dark:border-gray-700">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Weak Areas
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Thermodynamics</span>
                        <span className="text-sm text-red-500">40%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Inorganic Chemistry</span>
                        <span className="text-sm text-red-500">35%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Genetics</span>
                        <span className="text-sm text-orange-500">65%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg dark:border-gray-700">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Strong Areas
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Mechanics</span>
                        <span className="text-sm text-green-500">85%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Organic Chemistry</span>
                        <span className="text-sm text-green-500">90%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Human Physiology</span>
                        <span className="text-sm text-green-500">88%</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Generate Custom Study Plan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 dark:text-gray-400 text-sm py-6 border-t dark:border-gray-800">
        <p>NEET Prep Master © {new Date().getFullYear()} - Your complete NEET preparation platform</p>
        <p className="mt-1">Designed for future medical professionals</p>
      </footer>
    </div>
  );
}

// Helper component (if needed)
function TrendingUp({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}