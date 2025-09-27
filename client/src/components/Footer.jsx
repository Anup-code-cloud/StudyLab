import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowUp,
  MessageCircle,
  Download,
  BookOpen,
  Users,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  // Check scroll position for back-to-top button
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrollVisible(window.scrollY > 300);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "12th Notes", path: "/notes/12th" },
    { name: "10th Notes", path: "/notes/10th" },
    { name: "B.Tech Notes", path: "/notes/Btech" },
    { name: "UPSC Materials", path: "/notes/UPSC" },
    { name: "NEET Preparation", path: "/notes/NEET" },
    { name: "JEE Materials", path: "/notes/jee" },  
  ];


  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" }
  ];

  const socialLinks = [
    { icon: Facebook, url: "#", label: "Facebook" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Instagram, url: "#", label: "Instagram" },
    { icon: Linkedin, url: "#", label: "LinkedIn" },
    { icon: Youtube, url: "#", label: "YouTube" }
  ];

  const stats = [
    { icon: BookOpen, number: "10,000+", label: "Study Resources" },
    { icon: Users, number: "50,000+", label: "Active Learners" },
    { icon: Download, number: "1M+", label: "Downloads" },
    { icon: Award, number: "100+", label: "Expert Educators" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with StudyLab</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest study materials, exam updates, and learning tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white bg-white/90 text-gray-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </button>
          </form>

          {isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-200 font-medium"
            >
              🎉 Thank you for subscribing!
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">StudyLab</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your premier destination for quality study materials, exam preparation resources, and academic success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Study Materials</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">support@studylab.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+(91) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">123 Education St, Learning City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} StudyLab. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with <Heart className="w-4 h-4 text-red-500 inline" /> for students</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Accepted payments:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3 z-40">
        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isScrollVisible ? 1 : 0, 
            scale: isScrollVisible ? 1 : 0 
          }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </motion.button>

        {/* Feedback Button */}
        <Link
          to="/feedback"
          className="w-12 h-12 bg-purple-600 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition"
          aria-label="Give feedback"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Link>
      </div>
    </footer>
  );
}