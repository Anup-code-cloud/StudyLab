import { Link } from "react-router-dom"; 
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  Sun,
  Moon,
  Bell,
  User,
  BookOpen,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Settings,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

// -----------------------------
// MOCK DATA (swap with API)
// -----------------------------
const subjects = [
  { id: "phy", name: "Physics", color: "#6366F1", progress: 78 },
  { id: "chem", name: "Chemistry", color: "#06B6D4", progress: 64 },
  { id: "math", name: "Mathematics", color: "#F59E0B", progress: 86 },
  { id: "bio", name: "Biology", color: "#22C55E", progress: 58 },
];

const hoursData = [
  { day: "Mon", hrs: 2.5 },
  { day: "Tue", hrs: 3.2 },
  { day: "Wed", hrs: 1.8 },
  { day: "Thu", hrs: 4.1 },
  { day: "Fri", hrs: 2.2 },
  { day: "Sat", hrs: 5.0 },
  { day: "Sun", hrs: 3.6 },
];

const recentResources = [
  { id: 1, type: "Notes", title: "12th Physics – Electrostatics", tag: "PDF", meta: "24 pages" },
  { id: 2, type: "Book", title: "Organic Chemistry Quick Guide", tag: "eBook", meta: "Ch. 1–3" },
  { id: 3, type: "Paper", title: "JEE 2023 Maths (Set B)", tag: "Question Paper", meta: "90 mins" },
  { id: 4, type: "Video", title: "UPSC Polity Laxmikanth – Basics", tag: "Lecture", meta: "32 mins" },
];

const announcementsMock = [
  { id: "a1", title: "Library maintenance", text: "Server upgrade tonight 11 PM – 1 AM.", tone: "info" },
  { id: "a2", title: "Mock Tests Week", text: "Daily timed mocks unlocked for JEE & NEET.", tone: "success" },
];

// -----------------------------
// HELPERS
// -----------------------------
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

function useInterval(callback, delay) {
  const savedRef = useRef();
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => savedRef.current?.(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// -----------------------------
// COMPONENT
// -----------------------------
export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Tasks
  const [tasks, setTasks] = useState([
    { id: "t1", text: "Finish Physics Electrostatics", done: false, due: "2025-08-28" },
    { id: "t2", text: "Revise Organic Chemistry", done: true, due: "2025-08-25" },
    { id: "t3", text: "Attempt JEE Maths Mock #12", done: false, due: "2025-08-27" },
  ]);
  const [newTask, setNewTask] = useState("");

  // Pomodoro
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // focus | short | long
  const FOCUS = 25 * 60; // seconds
  const SHORT = 5 * 60;
  const LONG = 15 * 60;
  const [secondsLeft, setSecondsLeft] = useState(FOCUS);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Timer logic
  useInterval(
    () => {
      if (!isRunning) return;
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
      // Simple notification (could use toasts)
      setNotificationsOpen(true);
    }
  }, [secondsLeft]);

  const switchMode = (m) => {
    setMode(m);
    const map = { focus: FOCUS, short: SHORT, long: LONG };
    setSecondsLeft(map[m]);
    setIsRunning(false);
  };

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  // KPIs
  const totals = useMemo(() => {
    const totalHrs = hoursData.reduce((a, b) => a + b.hrs, 0);
    const tasksDone = tasks.filter((t) => t.done).length;
    const tasksTotal = tasks.length;
    return { totalHrs, tasksDone, tasksTotal };
  }, [tasks]);

  // Derived subject pie
  const subjectPie = subjects.map((s) => ({ name: s.name, value: s.progress, color: s.color }));

  // Streak (mock)
  const streakDays = 7;

  function addTask() {
    const text = newTask.trim();
    if (!text) return;
    setTasks((prev) => [{ id: crypto.randomUUID(), text, done: false, due: "" }, ...prev]);
    setNewTask("");
  }
  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Card animation variant
  const cardV = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    hover: { y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top bar */}
      <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-600" size={18} />
            <h1 className="text-lg font-semibold">StudyLab • Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <Search size={16} className="opacity-70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, notes, exams…"
                className="bg-transparent outline-none text-sm w-64"
              />
            </div>
            <button
              onClick={() => setNotificationsOpen((s) => !s)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <User size={18} />
              <Link  to="/profile"
               className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800    transition">
                <div className="text-xs leading-tight hidden sm:block">
                <div className="font-medium">Anoop verma</div>
                <div className="opacity-70">Student</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {notificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-7xl mx-auto px-4 pb-3"
            >
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3">
                <div className="text-sm font-medium mb-2">Notifications</div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  {announcementsMock.map((a) => (
                    <div key={a.id} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="font-medium">{a.title}</div>
                      <div className="opacity-80">{a.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT • Main column */}
        <section className="lg:col-span-8 space-y-6">
          {/* Greeting + streak */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-75">Welcome back,</div>
                <div className="text-2xl font-semibold">Av 👋 Keep the momentum!</div>
                <div className="text-sm mt-1 opacity-80">“Consistency is what transforms average into excellence.”</div>
              </div>
              <div className="text-center px-4">
                <div className="text-xs opacity-70">Current streak</div>
                <div className="text-3xl font-bold">{streakDays}🔥</div>
                <div className="text-xs opacity-70">days</div>
              </div>
            </div>
          </motion.div>

          {/* KPI cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total hours */}
            <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
              <div className="text-xs opacity-70">Study hours (week)</div>
              <div className="text-3xl font-semibold mt-1">{totals.totalHrs.toFixed(1)}</div>
              <div className="text-xs text-emerald-500 mt-1">+12% vs last week</div>
            </motion.div>

            {/* Tasks */}
            <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
              <div className="text-xs opacity-70">Tasks</div>
              <div className="text-3xl font-semibold mt-1">{totals.tasksDone}/{totals.tasksTotal}</div>
              <div className="text-xs text-indigo-500 mt-1">Mark completed as you go</div>
            </motion.div>

            {/* Next session timer (read-only) */}
            <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
              <div className="text-xs opacity-70">Pomodoro</div>
              <div className="text-3xl font-semibold mt-1">{pad(mm)}:{pad(ss)}</div>
              <div className="text-xs text-rose-500 mt-1 capitalize">{mode} session</div>
            </motion.div>
          </div>

          {/* Study hours trend */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm opacity-75">Study Trend</div>
                <div className="text-lg font-semibold">Hours across the week</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700">Week</button>
                <button className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 opacity-60">Month</button>
              </div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hoursData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hrs" stroke="#6366F1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Tasks + Uploads */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Tasks */}
            <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm opacity-75">Your Tasks</div>
                <div className="flex items-center gap-2 text-xs">
                  <button onClick={() => switchMode("focus")} className={`px-2 py-1 rounded-lg border ${mode === "focus" ? "border-indigo-500 text-indigo-500" : "border-gray-300 dark:border-gray-700"}`}>Focus</button>
                  <button onClick={() => switchMode("short")} className={`px-2 py-1 rounded-lg border ${mode === "short" ? "border-indigo-500 text-indigo-500" : "border-gray-300 dark:border-gray-700"}`}>Short</button>
                  <button onClick={() => switchMode("long")} className={`px-2 py-1 rounded-lg border ${mode === "long" ? "border-indigo-500 text-indigo-500" : "border-gray-300 dark:border-gray-700"}`}>Long</button>
                </div>
              </div>

              {/* Timer controls */}
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setIsRunning((s) => !s)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white flex items-center gap-2 hover:bg-indigo-500">
                  {isRunning ? <Pause size={16} /> : <Play size={16} />}
                  {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={() => switchMode(mode)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RotateCcw size={16} /> Reset
                </button>
                <div className="ml-auto text-sm opacity-75">Next: Review notes</div>
              </div>

              {/* Add task */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a task (e.g., Solve 10 Maths problems)"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                />
                <button onClick={addTask} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Plus size={16} /> Add
                </button>
              </div>

              {/* Task list */}
              <ul className="space-y-2">
                {tasks.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                    <button
                      onClick={() => toggleTask(t.id)}
                      className={`h-5 w-5 rounded-full border flex items-center justify-center ${t.done ? "bg-emerald-500 border-emerald-500" : "border-gray-300 dark:border-gray-700"}`}
                    >
                      {t.done && <CheckCircle2 size={14} className="text-white" />}
                    </button>
                    <div className={`flex-1 text-sm ${t.done ? "line-through opacity-60" : ""}`}>{t.text}</div>
                    {t.due && <div className="text-xs opacity-60">Due {t.due}</div>}
                    <button onClick={() => removeTask(t.id)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Uploads */}
            <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col items-center justify-center text-center">
              <BookOpen size={28} className="mb-2" />
              <div className="text-sm mb-3">Drop your notes / books to upload</div>
              <label className="cursor-pointer px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <input type="file" className="hidden" multiple />
                Browse Files
              </label>
              <div className="text-xs opacity-60 mt-2">PDF, DOCX, JPG (max 20 MB)</div>
            </motion.div>
          </div>

          {/* Recent resources */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm opacity-75">Recently opened</div>
              <button className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {recentResources.map((r) => (
                <div key={r.id} className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs opacity-70">{r.type} • {r.tag} • {r.meta}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* RIGHT • Secondary column */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Subjects progress (radial) */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm opacity-75">Subject Progress</div>
              <button className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700">Manage</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((s) => (
                <div key={s.id} className="p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="text-xs opacity-70 mb-1">{s.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <div className="h-full" style={{ width: `${s.progress}%`, background: s.color }} />
                    </div>
                    <div className="text-xs w-8 text-right">{s.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Categories distribution */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="text-sm opacity-75 mb-3">Resources by Category</div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Books", value: 46 },
                      { name: "Notes", value: 34 },
                      { name: "Papers", value: 12 },
                      { name: "Videos", value: 8 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={2}
                  >
                    {["#6366F1", "#06B6D4", "#F59E0B", "#22C55E"].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Mini calendar (static mock) */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-75">August 2025</div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronLeft size={16} /></button>
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["M","T","W","T","F","S","S"].map((d) => (
                <div key={d} className="opacity-60 py-1">{d}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`py-1 rounded-lg ${[5,12,19,26].includes(i+1) ? "bg-indigo-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{i + 1}</div>
              ))}
            </div>
            <div className="text-xs opacity-70 mt-2">Highlighted: scheduled study sessions</div>
          </motion.div>

          {/* Announcements */}
          <motion.div variants={cardV} initial="hidden" animate="show" whileHover="hover" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-75">Announcements</div>
              <Settings size={16} className="opacity-70" />
            </div>
            <ul className="space-y-2 text-sm">
              {announcementsMock.map((a) => (
                <li key={a.id} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="font-medium">{a.title}</div>
                  <div className="opacity-80">{a.text}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 pb-10 mt-2 text-xs opacity-70">
        © {new Date().getFullYear()} StudyLab • Built with React, Tailwind, Recharts, and Framer Motion
      </footer>
    </div>
  );
}
