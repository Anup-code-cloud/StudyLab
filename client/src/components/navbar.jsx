import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiBook } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search as SearchIcon,
  Bell,
  User,
  Sun,
  Moon,
  LogOut,
  Settings,
  BookOpen,
  User as UserIcon,
  ChevronDown,
  ChevronUp,
  Mail,
  HelpCircle,
  CreditCard,
  FileText,
  Download,
  Star,
  History,
  TrendingUp,
  Bookmark
} from "lucide-react";

// Mock data for notifications and search suggestions
const mockNotifications = [
  { id: 1, title: "New notes available", message: "Physics notes for Class 12th have been updated", time: "10 mins ago", read: false },
  { id: 2, title: "Exam reminder", message: "Your weekly test is scheduled for tomorrow", time: "2 hours ago", read: false },
  { id: 3, title: "Study group invite", message: "You've been invited to join 'Maths Study Group'", time: "1 day ago", read: true },
  { id: 4, title: "Achievement unlocked", message: "You've completed 100 practice questions", time: "2 days ago", read: true },
];

const searchSuggestions = [
  { id: 1, title: "Class 12 Physics Notes", category: "Notes", icon: <FileText className="w-4 h-4" /> },
  { id: 2, title: "JEE Main Previous Papers", category: "Exam Papers", icon: <FileText className="w-4 h-4" /> },
  { id: 3, title: "Organic Chemistry Concepts", category: "Topics", icon: <BookOpen className="w-4 h-4" /> },
  { id: 4, title: "NEET Biology Flashcards", category: "Study Materials", icon: <BookOpen className="w-4 h-4" /> },
  { id: 5, title: "UPSC Current Affairs", category: "News", icon: <TrendingUp className="w-4 h-4" /> },
];

// Custom hook for click outside detection
const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

export default function Navbar({ navLinks }) {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications] = useState(mockNotifications.filter(n => !n.read).length);

  const location = useLocation();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  // default nav links if none provided
  const defaultLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Notes 12th", path: "/notes12th" },
    { name: "Notes 10th", path: "/notes10th" },
    { name: "UPSC", path: "/upsc" },
    { name: "SSC", path: "/ssc" },
    { name: "B.Tech", path: "/Btech" },
    { name: "NEET", path: "/NEET" },
    { name: "JEE", path: "/jee" },
    { name: "News", path: "/news" },
    { name: "Login", path: "/Login" },
  ];

  const links = navLinks && Array.isArray(navLinks) && navLinks.length ? navLinks : defaultLinks;

  // Close dropdowns when clicking outside
  useClickOutside(profileRef, () => setProfileDropdownOpen(false));
  useClickOutside(notificationsRef, () => setNotificationsOpen(false));
  useClickOutside(searchRef, () => setSearchOpen(false));

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
    if (savedTheme === "light") setDarkMode(false);
  }, []);

  // Close overlays when route changes
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  }, [location]);

  // Handle search
  const handleSearch = useCallback((e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }, [searchQuery, navigate]);

  // Filter search suggestions
  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : searchSuggestions;

  // Mark all notifications as read
  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log("All notifications marked as read");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-extrabold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          <motion.span
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-sm font-medium text-white shadow"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FiBook className="w-5 h-5" />
          </motion.span>
          <span className="sr-only">StudyLab - home</span>
          <motion.span
            className="hidden sm:inline bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            StudyLab
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isActive
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                  : "text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <SearchIcon className="w-5 h-5" />
          </motion.button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadNotifications}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    {unreadNotifications > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors ${!notification.read ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 dark:text-white">{notification.title}</h4>
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/notifications"
                      className="block text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={darkMode}
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <UserIcon className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
              {profileDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>

                  <Link
                    to="/my-courses"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    My Courses
                  </Link>

                  <Link
                    to="/downloads"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Download className="w-4 h-4 mr-3" />
                    Downloads
                  </Link>

                  <Link
                    to="/bookmarks"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Bookmark className="w-4 h-4 mr-3" />
                    Bookmarks
                  </Link>

                  <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </Link>

                  <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu content */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-white dark:bg-gray-900"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <button
                  onClick={() => setDarkMode(d => !d)}
                  className="flex items-center w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-5 h-5 mr-3" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 mr-3" />
                      Dark Mode
                    </>
                  )}
                </button>

                <Link
                  to="/profile"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-11/12 max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              ref={searchRef}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search notes, topics, exams, authors..."
                  className="w-full pl-10 pr-4 py-4 text-lg border-0 focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {searchQuery && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {filteredSuggestions.length > 0 ? 'Suggestions' : 'No results found'}
                  </div>

                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center"
                      onClick={() => {
                        navigate(`/search?q=${encodeURIComponent(item.title)}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex-shrink-0 text-indigo-600 dark:text-indigo-400 mr-3">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <ChevronUp className="h-4 w-4 text-gray-400 transform rotate-45" />
                      </div>
                    </div>
                  ))}

                  {searchQuery && filteredSuggestions.length > 0 && (
                    <div
                      className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      See all results for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 p-4">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Recent Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Physics', 'Chemistry', 'Maths', 'Biology', 'History'].map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        onClick={() => setSearchQuery(topic)}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Popular Topics
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Quantum Physics', 'Organic Chemistry', 'Calculus', 'Genetics', 'World War II'].map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        onClick={() => setSearchQuery(topic)}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}