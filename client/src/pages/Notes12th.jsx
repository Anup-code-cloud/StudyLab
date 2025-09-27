import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBook, FiDownload, FiSearch, FiFilter, FiClock, FiEye, FiStar, FiArrowLeft } from "react-icons/fi";

const Notes12th = () => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [activeNote, setActiveNote] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Sample notes data
  const subjects = [
    { id: "physics", name: "Physics", color: "bg-red-100 text-red-800", icon: "⚛️" },
    { id: "chemistry", name: "Chemistry", color: "bg-blue-100 text-blue-800", icon: "🧪" },
    { id: "math", name: "Mathematics", color: "bg-green-100 text-green-800", icon: "∫" },
    { id: "biology", name: "Biology", color: "bg-purple-100 text-purple-800", icon: "🧬" },
    { id: "english", name: "English", color: "bg-yellow-100 text-yellow-800", icon: "📖" },
    { id: "computer", name: "Computer Science", color: "bg-indigo-100 text-indigo-800", icon: "💻" },
  ];

  const notes = [
    {
      id: 1,
      title: "Electrostatics Complete Notes",
      subject: "physics",
      description: "Comprehensive notes on electrostatics including Coulomb's law, electric fields, and potential.",
      pages: 24,
      downloads: 1245,
      views: 2897,
      rating: 4.8,
      fileSize: "4.2 MB",
      fileType: "PDF",
      uploaded: "3 days ago",
      author: "Dr. Sharma",
      tags: ["electrostatics", "cbse", "important"],
      content: "This is the full content of the electrostatics notes..."
    },
    {
      id: 2,
      title: "Organic Chemistry Reactions",
      subject: "chemistry",
      description: "Important organic chemistry reactions with mechanisms and examples.",
      pages: 32,
      downloads: 987,
      views: 2156,
      rating: 4.7,
      fileSize: "5.1 MB",
      fileType: "PDF",
      uploaded: "1 week ago",
      author: "Prof. Gupta",
      tags: ["organic chemistry", "reactions", "cbse"],
      content: "This is the full content of the organic chemistry notes..."
    },
    {
      id: 3,
      title: "Calculus Fundamentals",
      subject: "math",
      description: "Detailed notes on differential and integral calculus with practice problems.",
      pages: 45,
      downloads: 1567,
      views: 3421,
      rating: 4.9,
      fileSize: "6.8 MB",
      fileSize: "6.8 MB",
      fileType: "PDF",
      uploaded: "2 days ago",
      author: "Dr. Kumar",
      tags: ["calculus", "differentiation", "integration"],
      content: "This is the full content of the calculus notes..."
    },
    {
      id: 4,
      title: "Genetics and Evolution",
      subject: "biology",
      description: "Complete chapter on genetics, DNA, RNA, and evolutionary biology.",
      pages: 38,
      downloads: 1123,
      views: 2678,
      rating: 4.6,
      fileSize: "5.5 MB",
      fileType: "PDF",
      uploaded: "5 days ago",
      author: "Dr. Patel",
      tags: ["genetics", "evolution", "dna"],
      content: "This is the full content of the genetics notes..."
    },
    {
      id: 5,
      title: "Literary Devices in English",
      subject: "english",
      description: "Comprehensive guide to literary devices with examples from prescribed texts.",
      pages: 28,
      downloads: 845,
      views: 1892,
      rating: 4.5,
      fileSize: "3.9 MB",
      fileType: "PDF",
      uploaded: "1 week ago",
      author: "Dr. Mehta",
      tags: ["literary devices", "english", "writing"],
      content: "This is the full content of the literary devices notes..."
    },
    {
      id: 6,
      title: "Python Programming Basics",
      subject: "computer",
      description: "Introduction to Python programming with examples and exercises.",
      pages: 36,
      downloads: 1342,
      views: 2987,
      rating: 4.7,
      fileSize: "4.8 MB",
      fileType: "PDF",
      uploaded: "4 days ago",
      author: "Prof. Joshi",
      tags: ["python", "programming", "computer science"],
      content: "This is the full content of the python notes..."
    },
    {
      id: 7,
      title: "Optics and Wave Theory",
      subject: "physics",
      description: "Detailed notes on ray optics, wave optics, and optical instruments.",
      pages: 31,
      downloads: 1098,
      views: 2456,
      rating: 4.6,
      fileSize: "4.5 MB",
      fileType: "PDF",
      uploaded: "6 days ago",
      author: "Dr. Sharma",
      tags: ["optics", "waves", "light"],
      content: "This is the full content of the optics notes..."
    },
    {
      id: 8,
      title: "Chemical Bonding Summary",
      subject: "chemistry",
      description: "Comprehensive summary of chemical bonding concepts and problem-solving techniques.",
      pages: 27,
      downloads: 923,
      views: 1987,
      rating: 4.4,
      fileSize: "3.7 MB",
      fileType: "PDF",
      uploaded: "3 days ago",
      author: "Prof. Gupta",
      tags: ["chemical bonding", "molecules", "structures"],
      content: "This is the full content of the chemical bonding notes..."
    }
  ];

  // Filter notes based on selected subject and search query
  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  // Sort notes based on selected sort option
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "popular") return b.downloads - a.downloads;
    if (sortBy === "recent") return new Date(b.uploaded) - new Date(a.uploaded);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Get subject name by ID
  const getSubjectName = (subjectId) => {
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject ? subject.name : "Unknown";
  };

  // Get subject color by ID
  const getSubjectColor = (subjectId) => {
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject ? subject.color : "bg-gray-100 text-gray-800";
  };

  // Get subject icon by ID
  const getSubjectIcon = (subjectId) => {
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject ? subject.icon : "📄";
  };

  // Handle note download
  const handleDownload = (noteId) => {
    // In a real app, this would download the actual file
    console.log(`Downloading note ${noteId}`);
    // Simulate download
    alert(`Download started for note ${noteId}`);
  };

  // Handle note view
  const handleViewNote = (note) => {
    setActiveNote(note);
  };

  // Handle back to list
  const handleBackToList = () => {
    setActiveNote(null);
  };

  // Render note detail view
  if (activeNote) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBackToList}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Notes
          </button>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(activeNote.subject)}`}>
                    {getSubjectIcon(activeNote.subject)} {getSubjectName(activeNote.subject)}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-2">{activeNote.title}</h1>
                  <p className="text-gray-600 mt-2">{activeNote.description}</p>
                </div>
                <button 
                  onClick={() => handleDownload(activeNote.id)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiDownload className="mr-2" /> Download
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiClock className="mr-1" /> {activeNote.uploaded}
                </div>
                <div className="flex items-center">
                  <FiEye className="mr-1" /> {activeNote.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <FiDownload className="mr-1" /> {activeNote.downloads.toLocaleString()} downloads
                </div>
                <div className="flex items-center">
                  <FiStar className="mr-1 text-yellow-500" /> {activeNote.rating}
                </div>
                <div className="flex items-center">
                  <FiBook className="mr-1" /> {activeNote.pages} pages
                </div>
                <div className="flex items-center">
                  {activeNote.fileType} • {activeNote.fileSize}
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700">By {activeNote.author}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {activeNote.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Preview</h2>
              <div className="prose max-w-none border rounded-lg p-4 bg-gray-50">
                <p>{activeNote.content}</p>
                <p className="mt-4">This is a preview of the note content. Download the full PDF to access all pages and detailed explanations.</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Related Notes</h3>
                <div className="grid grid-cols-1 gap-4">
                  {notes
                    .filter(note => note.subject === activeNote.subject && note.id !== activeNote.id)
                    .slice(0, 2)
                    .map(note => (
                      <div key={note.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewNote(note)}>
                        <h4 className="font-medium text-blue-600">{note.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{note.description.substring(0, 100)}...</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render main notes list view
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            <FiBook className="mr-3 text-blue-600" /> 12th Class Notes
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Comprehensive study materials for CBSE, ICSE, and state board students. Download high-quality notes for all subjects.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notes by title, description, or tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-400 mr-2" />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Subject Filters */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Subject</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedSubject === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                onClick={() => setSelectedSubject("all")}
              >
                All Subjects
              </button>
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${selectedSubject === subject.id ? subject.color : "bg-gray-100 text-gray-800"}`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <span className="mr-2">{subject.icon}</span> {subject.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notes Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredNotes.length} of {notes.length} notes
            {selectedSubject !== "all" && ` in ${getSubjectName(selectedSubject)}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        {/* Notes Grid/List */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNotes.map(note => (
              <div key={note.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(note.subject)}`}>
                      {getSubjectIcon(note.subject)} {getSubjectName(note.subject)}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <FiStar className="text-yellow-500 mr-1" /> {note.rating}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{note.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiClock className="mr-1" /> {note.uploaded}
                    </div>
                    <div className="flex items-center">
                      <FiDownload className="mr-1" /> {note.downloads}
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <button 
                    onClick={() => handleViewNote(note)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDownload(note.id)}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiDownload className="mr-1" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {sortedNotes.map(note => (
              <div key={note.id} className="border-b border-gray-200 last:border-0">
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(note.subject)}`}>
                          {getSubjectIcon(note.subject)} {getSubjectName(note.subject)}
                        </span>
                        <span className="flex items-center text-sm text-gray-500 ml-3">
                          <FiStar className="text-yellow-500 mr-1" /> {note.rating}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
                      <p className="text-gray-600 mb-4">{note.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiClock className="mr-1" /> {note.uploaded}
                        </div>
                        <div className="flex items-center">
                          <FiEye className="mr-1" /> {note.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center">
                          <FiDownload className="mr-1" /> {note.downloads.toLocaleString()} downloads
                        </div>
                        <div className="flex items-center">
                          <FiBook className="mr-1" /> {note.pages} pages
                        </div>
                        <div className="flex items-center">
                          {note.fileType} • {note.fileSize}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-6">
                      <button 
                        onClick={() => handleViewNote(note)}
                        className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium text-sm text-left md:text-right"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleDownload(note.id)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load More Button (for pagination in a real app) */}
        {filteredNotes.length > 0 && (
          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes12th;