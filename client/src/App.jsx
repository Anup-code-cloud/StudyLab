import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/ChatBot";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./components/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Feedback = lazy(() => import("./pages/Feedback"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OTPVerification = lazy(() => import("./pages/OTPVerification"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Notes = lazy(() => import("./pages/Notes"));
const Notes10th = lazy(() => import("./pages/Notes10th"));
const Notes12th = lazy(() => import("./pages/Notes12th"));
const NotesPage = lazy(() => import("./components/NotesPage"));
const Novel = lazy(() => import("./pages/Novel"));
const News = lazy(() => import("./pages/News"));
const JEE = lazy(() => import("./pages/JEE"));
const NEET = lazy(() => import("./pages/NEET"));
const UPSC = lazy(() => import("./pages/UPSC"));
const SSC = lazy(() => import("./pages/SSC"));
const Btech = lazy(() => import("./pages/Btech"));
const CLASS1TO8TH = lazy(() => import("./pages/class1to8th"));
const Defence = lazy(() => import("./pages/Defence"));
const Refresh = lazy(() => import("./pages/refresh"));
const Settings = lazy(() => import("./components/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex="-1" className="flex-1">
        <Suspense fallback={<div className="min-h-[50vh] grid place-items-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/chatbot" element={<ChatBot />} />



            {/* Notes */}
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes10th" element={<Notes10th />} />
            <Route path="/notes12th" element={<Notes12th />} />
            <Route path="/Notespage" element={<NotesPage />} />

            {/* Exams */}
            <Route path="/novel" element={<Novel />} />
            <Route path="/news" element={<News />} />
            <Route path="/jee" element={<JEE />} />
            <Route path="/NEET" element={<NEET />} />
            <Route path="/UPSC" element={<UPSC />} />
            <Route path="/ssc" element={<SSC />} />
            <Route path="/Btech" element={<Btech />} />
            <Route path="/defence" element={<Defence />} />
            <Route path="/class1to8th" element={<CLASS1TO8TH />} />

            {/* Protected 
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 
             */}

            {/* Utility */}
            <Route path="/refresh" element={<Refresh />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
