import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { 
  FiBook, 
  FiUsers, 
  FiAward, 
  FiBarChart2, 
  FiBookOpen, 
  FiCheckCircle,
  FiPlay,
  FiArrowRight,
  FiSearch,
  FiClock,
  FiStar
} from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Enhanced categories with more details
const categories = [
  { 
    name: "12th Notes", 
    path: "/notes12th", 
    color: "bg-gradient-to-r from-blue-400 to-blue-600", 
    icon: "📚",
    count: 128,
    tags: ["Physics", "Chemistry", "Mathematics", "Biology"]
  },
  { 
    name: "10th Notes", 
    path: "/notes10th", 
    color: "bg-gradient-to-r from-green-400 to-green-600", 
    icon: "📝",
    count: 95,
    tags: ["Science", "Math", "Social Studies", "English"]
  },
  { 
    name: "B.Tech", 
    path: "/Btech", 
    color: "bg-gradient-to-r from-purple-400 to-purple-600", 
    icon: "💻",
    count: 212,
    tags: ["CSE", "Mechanical", "Electrical", "Civil"]
  },
  { 
    name: "UPSC", 
    path: "/UPSC", 
    color: "bg-gradient-to-r from-orange-400 to-orange-600", 
    icon: "🏛️",
    count: 178,
    tags: ["Current Affairs", "History", "Polity", "Geography"]
  },
  { 
    name: "SSC", 
    path: "/ssc", 
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600", 
    icon: "📊",
    count: 145,
    tags: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"]
  },
  { 
    name: "NEET", 
    path: "/NEET", 
    color: "bg-gradient-to-r from-red-400 to-red-600", 
    icon: "🧬",
    count: 196,
    tags: ["Biology", "Chemistry", "Physics", "Previous Papers"]
  },
  { 
    name: "JEE", 
    path: "/jee", 
    color: "bg-gradient-to-r from-pink-400 to-pink-600", 
    icon: "🧮",
    count: 167,
    tags: ["Mathematics", "Physics", "Chemistry", "Mock Tests"]
  },
  { 
    name: "Defence", 
    path: "/Defence", 
    color: "bg-gradient-to-r from-teal-400 to-teal-600", 
    icon: "🎖️",
    count: 134,
    tags: ["NDA", "CDS", "AFCAT", "SSB Interview"]
  },
  { 
    name: "Novels", 
    path: "/novel", 
    color: "bg-gradient-to-r from-indigo-400 to-indigo-600", 
    icon: "📖",
    count: 83,
    tags: ["Fiction", "Non-Fiction", "Classics", "Biographies"]
  },
  { 
    name: "Class 1-8th", 
    path: "/class1to8th", 
    color: "bg-gradient-to-r from-cyan-400 to-cyan-600", 
    icon: "👦",
    count: 247,
    tags: ["English", "Math", "Science", "Social Studies"]
  },
  { 
    name: "News", 
    path: "/news", 
    color: "bg-gradient-to-r from-gray-400 to-gray-600", 
    icon: "📰",
    count: 42,
    tags: ["Current Affairs", "Editorials", "Monthly Digests", "Yearly Compilations"]
  },
  { 
    name: "Competitive Programming", 
    path: "/competitive-programming", 
    color: "bg-gradient-to-r from-amber-400 to-amber-600", 
    icon: "💾",
    count: 89,
    tags: ["Algorithms", "Data Structures", "Problem Solving", "Contests"]
  },
];

// Example featured notes (can come from DB/API later)
const featuredNotes = [
  {
    id: 1,
    title: "Physics Formula Sheet (12th)",
    desc: "Quick revision sheet for Class 12 Physics covering all important formulas.",
    link: "/notes12th",
    rating: 4.8,
    downloads: 1245,
    updated: "3 days ago",
    category: "12th Notes",
    level: "Intermediate",
    pages: 24,
    fileType: "PDF",
    fileSize: "4.2 MB"
  },
  {
    id: 2,
    title: "UPSC Current Affairs 2025",
    desc: "Monthly current affairs PDF for UPSC preparation with detailed analysis.",
    link: "/UPSC",
    rating: 4.9,
    downloads: 2897,
    updated: "1 week ago",
    category: "UPSC",
    level: "Advanced",
    pages: 78,
    fileType: "PDF",
    fileSize: "8.7 MB"
  },
  {
    id: 3,
    title: "NEET Biology Key Notes",
    desc: "Important Biology notes for NEET aspirants with diagrams and mnemonics.",
    link: "/NEET",
    rating: 4.7,
    downloads: 3124,
    updated: "2 days ago",
    category: "NEET",
    level: "Advanced",
    pages: 56,
    fileType: "PDF",
    fileSize: "6.5 MB"
  },
  {
    id: 4,
    title: "JavaScript Algorithms Book",
    desc: "Comprehensive guide to JavaScript algorithms with practical examples.",
    link: "/competitive-programming",
    rating: 4.6,
    downloads: 1895,
    updated: "5 days ago",
    category: "Competitive Programming",
    level: "Intermediate",
    pages: 132,
    fileType: "PDF",
    fileSize: "12.3 MB"
  },
];

// Popular searches
const popularSearches = ["Physics Notes", "Math Formulas", "History PDF", "Chemistry Guide", "English Grammar", "Current Affairs", "Previous Year Papers"];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "NEET Aspirant",
    content: "StudyLab helped me secure AIR 342 with their comprehensive notes and mock tests. The biology notes were especially helpful!",
    avatar: "👨‍⚕️",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UPSC Student",
    content: "The current affairs compilation is unmatched. Saved me hours of research time every day. Highly recommended!",
    avatar: "👩‍💼",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "JEE Aspirant",
    content: "The formula sheets and quick revision notes were a game changer for my JEE preparation. Thanks StudyLab!",
    avatar: "👨‍🎓",
    rating: 4
  }
];

// Debounce hook for search
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

export default function HomePage() {
  const [stats, setStats] = useState([
    { value: 0, label: "Active Students", suffix: "K+", icon: <FiUsers />, target: 50 },
    { value: 0, label: "Expert Instructors", suffix: "+", icon: <FiAward />, target: 120 },
    { value: 0, label: "Courses Available", suffix: "+", icon: <FiBookOpen />, target: 500 },
    { value: 0, label: "Success Rate", suffix: "%", icon: <FiBarChart2 />, target: 95 }
  ]);

  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    level: [],
    fileType: [],
    rating: null
  });
  
  const debouncedSearch = useDebounce(search, 300);

  // Animate counting up the stats
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const interval = 20; // Update interval in ms
    const steps = duration / interval;
    
    const counters = stats.map(stat => {
      const stepValue = stat.target / steps;
      let currentValue = 0;
      
      const intervalId = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(intervalId);
        }
        
        setStats(prev => prev.map(s => 
          s.label === stat.label ? { ...s, value: Math.round(currentValue) } : s
        ));
      }, interval);
      
      return intervalId;
    });
    
    return () => counters.forEach(clearInterval);
  }, []);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // filter categories based on search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    cat.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  // Filter featured notes based on active category and filters
  const filteredFeaturedNotes = featuredNotes.filter(note => {
    if (activeCategory !== "all" && note.category !== activeCategory) return false;
    
    if (selectedFilters.level.length > 0 && !selectedFilters.level.includes(note.level)) return false;
    
    if (selectedFilters.fileType.length > 0 && !selectedFilters.fileType.includes(note.fileType)) return false;
    
    if (selectedFilters.rating && note.rating < selectedFilters.rating) return false;
    
    return true;
  });

  // Handle search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      // Add to recent searches (limit to 5)
      const updatedSearches = [
        search, 
        ...recentSearches.filter(s => s !== search)
      ].slice(0, 5);
      
      setRecentSearches(updatedSearches);
      setShowSuggestions(false);
      
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // In a real app, you would navigate to search results
      }, 1000);
    }
  }, [search, recentSearches]);

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      if (filterType === "rating") {
        return { ...prev, rating: prev.rating === value ? null : value };
      }
      
      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      level: [],
      fileType: [],
      rating: null
    });
    setActiveCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Carousel */}
      <div className="relative w-full h-screen">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active'
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-screen w-full">
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Students studying together"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-indigo-900/70"></div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-40"
              >
                <p className="text-lg md:text-xl font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                  Welcome To StudyLab
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
                  Learn From The <span className="text-indigo-400">Best Educators</span> 
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8">
                  Access comprehensive study materials, expert guidance, and interactive learning for all competitive exams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    <FiBook className="w-5 h-5" />
                    Explore Courses
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <FiPlay className="w-5 h-5" />
                    How It Works
                  </button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-screen w-full">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Online learning"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-purple-900/70"></div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-40 text-right"
              >
                <p className="text-lg md:text-xl font-semibold text-purple-400 uppercase tracking-widest mb-3">
                  Advanced Learning
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
                  Quality Education <span className="text-purple-400">Without Boundaries</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8 ml-auto">
                  Study anytime, anywhere with our comprehensive digital learning platform designed for success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button className="px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                    <FiBookOpen className="w-5 h-5" />
                    Browse Notes
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <FiSearch className="w-5 h-5" />
                    Find Resources
                  </button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2"></div>

        {/* Custom Navigation */}
        <button className="custom-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="custom-next absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center my-8 relative max-w-2xl mx-auto px-4">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories, notes, or resources..."
              value={search}
              onChange={handleSearchChange}
              onFocus={() => search.length > 0 && setShowSuggestions(true)}
              className="w-full px-6 py-4 border-0 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 dark:bg-gray-800 dark:text-white"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-3 border-b dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Recent Searches</h3>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  </div>
                  {recentSearches.map((term, index) => (
                    <div 
                      key={index}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer flex items-center"
                      onClick={() => {
                        setSearch(term);
                        setShowSuggestions(false);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm dark:text-white">{term}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Popular Searches */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => {
                        setSearch(term);
                        setShowSuggestions(false);
                      }}
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Category Suggestions */}
              {search.length > 0 && filteredCategories.length > 0 && (
                <div className="p-3 border-t dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Categories</h3>
                  {filteredCategories.slice(0, 3).map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{cat.icon}</span>
                        <span className="text-sm dark:text-white">{cat.name}</span>
                        <span className="ml-auto text-xs text-gray-400">{cat.count} resources</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        {categories.slice(0, 6).map((cat) => (
          <Link
            key={cat.path}
            to={cat.path}
            className="px-5 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="relative py-16 bg-white dark:bg-gray-800 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.value}{stat.suffix}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse Categories
          </h2>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition"
              aria-label="Toggle view mode"
            >
              {viewMode === "grid" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className={`${cat.color} rounded-2xl shadow-md p-6 text-white transition-all transform hover:scale-105 hover:shadow-lg relative overflow-hidden group`}
                >
                  <div className="absolute bottom-0 right-0 opacity-10 text-7xl transform translate-x-4 translate-y-2 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                    <p className="text-sm opacity-90">{cat.count} resources</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cat.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {cat.tags.length > 2 && (
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          +{cat.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-4 text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No categories found matching "{search}"</p>
                <button 
                  onClick={() => setSearch("")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="flex items-center p-6 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${cat.color} text-white`}>
                  {cat.icon}
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{cat.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{cat.count} resources</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {cat.tags.length > 3 && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      +{cat.tags.length - 3}
                    </span>
                  )}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Why Choose <span className="text-indigo-600 dark:text-indigo-400">StudyLab</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              We provide the best learning experience with quality content, expert guidance, and innovative tools.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiClock className="w-8 h-8" />,
                title: "Flexible Learning",
                description: "Learn at your own pace with 24/7 access to all study materials and resources."
              },
              {
                icon: <FiStar className="w-8 h-8" />,
                title: "Expert Educators",
                description: "Learn from industry experts and experienced educators with proven track records."
              },
              {
                icon: <FiBook className="w-8 h-8" />,
                title: "Comprehensive Materials",
                description: "Access detailed notes, practice tests, and reference materials for all subjects."
              },
              {
                icon: <FiCheckCircle className="w-8 h-8" />,
                title: "Regular Assessments",
                description: "Track your progress with regular tests and personalized feedback."
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Doubt Support",
                description: "Get your doubts cleared instantly with our dedicated support team."
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: "Certification",
                description: "Earn recognized certificates upon completion of courses and assessments."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Notes / Latest Updates */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Notes & Updates
          </h2>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.path} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            {(activeCategory !== "all" || Object.values(selectedFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter !== null
            )) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Filter Resources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Level Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</h4>
                <div className="space-y-2">
                  {["Beginner", "Intermediate", "Advanced"].map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.level.includes(level)}
                        onChange={() => handleFilterChange("level", level)}
                        className="rounded text-blue-500 focus:ring-blue-400"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* File Type Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File Type</h4>
                <div className="space-y-2">
                  {["PDF", "DOC", "PPT", "ZIP"].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.fileType.includes(type)}
                        onChange={() => handleFilterChange("fileType", type)}
                        className="rounded text-blue-500 focus:ring-blue-400"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Rating</h4>
                <div className="flex space-x-2">
                  {[4, 4.5, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange("rating", rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedFilters.rating === rating 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {filteredFeaturedNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeaturedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{note.title}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {note.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{note.desc}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {note.pages} pages
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {note.fileType}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span>{note.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>{note.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Updated {note.updated}</span>
                    <Link
                      to={note.link}
                      className="inline-flex items-center text-blue-500 font-medium hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition text-sm"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No resources found with the current filters</p>
            <button 
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">StudyLab in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600">10,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Study Resources</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-green-600">5,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-orange-600">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-20 bg-indigo-600 dark:bg-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Learning Experience?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10"
          >
            Join thousands of students who have already achieved their academic goals with StudyLab.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              Get Started Now
              <FiArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section  
      <section className="max-w-4xl mx-auto my-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-8 text-white px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with StudyLab</h2>
          <p className="mb-6 opacity-90">Get weekly updates on new resources, study tips, and exclusive content</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm opacity-80 mt-4">No spam, unsubscribe at any time</p>
        </div>
      </section>

      /* Footer CTA  
      <section className="max-w-4xl mx-auto my-16 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to boost your learning?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Join thousands of students who are already using StudyLab to excel in their studies</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
          Get Started Now
        </button>
      </section>
      */}

      <style jsx>{`
        .custom-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .custom-bullet-active {
          background-color: #fff;
          width: 30px;
          border-radius: 10px;
        }
        
        .custom-prev:hover, .custom-next:hover {
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </div>
  );
}