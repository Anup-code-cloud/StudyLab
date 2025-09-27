// pages/course.jsx
import React from "react";

const courses = [
  {
    title: "IIT JEE",
    desc: "Coaching for IIT JEE Main + Advanced",
    img: "https://static.pw.live/5b09189f7285894d9130ccd0/1f23db31-6da9-4ed1-93fe-baea21bad40b.webp",
    link: "/jee",
  },
  {
    title: "NEET",
    desc: "Complete NEET Preparation",
    img: " https://th.bing.com/th/id/OIP.3Tl57DdADpYEg-AuvodnLwHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7",
    link: "/neet",
  },
  {
    title: "UPSC / IAS",
    desc: "UPSC & State PSC Preparation",
    img: " https://th.bing.com/th/id/OIP.3Tl57DdADpYEg-AuvodnLwHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7",
    link: "/upsc",
  },
  {
    title: "SSC",
    desc: "Staff Selection Commission exams",
    img: " https://th.bing.com/th/id/OIP.3Tl57DdADpYEg-AuvodnLwHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7",
    link: "/ssc",
  },
  {
    title: "School Foundation",
    desc: "Classes 6th - 10th Foundation Programs",
    img: "https://th.bing.com/th/id/OIP.vfSr4CLZAg3NlSC0kM0IFgHaGv?w=199&h=182&c=7&r=0&o=5&pid=1.7",
    link: "/foundation",
  },
  {
    title: "Defence Exams",
    desc: "NDA, CDS, AFCAT, CAPF",
    img: " https://th.bing.com/th/id/OIP.3Tl57DdADpYEg-AuvodnLwHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7",
    link: "/defence",
  },
];

const Course = () => {
  return (
    <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Bharat’s Trusted & Affordable Learning Platform
        </h2>
        <p className="text-lg mb-6">
          Unlock your potential with StudyLab – Affordable, Quality Learning for
          Everyone.
        </p>
        <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
          Get Started
        </button>
      </section>

      {/* Courses Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Popular Courses
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => (
            <a
              href={course.link}
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-800">
                  {course.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">{course.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Course;
