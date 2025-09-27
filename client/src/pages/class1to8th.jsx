// pages/class1to8th.jsx
import React from "react";
import { motion } from "framer-motion";

const classHighlights = [
  "Interactive online & offline classes",
  "Expert teachers for every subject",
  "Small batch sizes for personalized attention",
  "Comprehensive syllabus coverage from Class 1 to 8",
  "Weekly quizzes & assessments",
  "Special focus on foundational learning",
  "Affordable fees with EMI options",
  "Scholarship programs for meritorious students",
];

const curriculum = [
  {
    className: "Class 1-2",
    subjects: ["Mathematics", "English", "Science", "EVS", "Art & Craft"],
  },
  {
    className: "Class 3-5",
    subjects: ["Mathematics", "English", "Science", "Social Studies", "Computer Basics"],
  },
  {
    className: "Class 6-8",
    subjects: ["Mathematics", "English", "Science", "Social Science", "Computer Science", "Moral Science"],
  },
];

const pricingPlans = [
  {
    plan: "Foundation (Class 1-2)",
    price: "₹12,999",
    duration: "6 Months",
    features: ["Full Syllabus", "Weekly Quizzes", "Recorded Lectures", "Doubt Clearing Sessions"],
  },
  {
    plan: "Intermediate (Class 3-5)",
    price: "₹18,999",
    duration: "6 Months",
    features: ["Full Syllabus", "Regular Tests", "Mentor Guidance", "Interactive Classes"],
  },
  {
    plan: "Advanced (Class 6-8)",
    price: "₹24,999",
    duration: "1 Year",
    features: ["Full Syllabus", "Mock Exams", "Project Work", "Scholarships upto 30%"],
  },
];

const faculty = [
  { name: "Ms. Priya Sharma", role: "English & Grammar Expert" },
  { name: "Mr. Rohan Verma", role: "Mathematics Mentor" },
  { name: "Ms. Ananya Gupta", role: "Science Teacher" },
  { name: "Mr. Arjun Singh", role: "Computer Science Instructor" },
];

const testimonials = [
  {
    name: "Aarav Kumar",
    feedback:
      "The interactive classes and quizzes helped me improve my Maths scores drastically. Highly recommend!",
  },
  {
    name: "Saanvi Verma",
    feedback:
      "Teachers are amazing! They explain every topic clearly, and the doubt sessions helped me a lot.",
  },
];

const Class1to8Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-20 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Classes 1 to 8 Learning Hub</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Interactive & expert-led classes for foundational learning, advanced skills, and academic excellence.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Enroll Now
        </motion.button>
      </motion.section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {classHighlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              ✅ {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Curriculum Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {curriculum.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg mb-2">{c.className}</h3>
                <ul className="text-gray-700 space-y-1">
                  {c.subjects.map((sub, i) => (
                    <li key={i}>• {sub}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Pricing & Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl font-bold text-orange-600 mb-2">{plan.plan}</h3>
              <p className="text-2xl font-bold">{plan.price}</p>
              <p className="text-gray-600 mb-4">{plan.duration}</p>
              <ul className="text-sm text-gray-700 mb-4 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                Enroll
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Meet Our Teachers
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {faculty.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="h-20 w-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center font-bold text-xl text-orange-600">
                  {f.name[0]}
                </div>
                <h3 className="mt-4 font-semibold">{f.name}</h3>
                <p className="text-gray-600 text-sm">{f.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="italic text-gray-700">“{t.feedback}”</p>
              <h3 className="mt-4 font-semibold text-orange-600">- {t.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA  
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-orange-600 text-white text-center py-16"
      >
        <h2 className="text-3xl font-bold mb-4">
          Start Your Child’s Learning Journey Today
        </h2>
        <p className="mb-6">
          Enroll now and give your child the best start for academic excellence.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Enroll Now
        </motion.button>
      </motion.section>
      */}
    </div>
  );
};

export default Class1to8Page;
