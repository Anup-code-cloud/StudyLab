// pages/Defence.jsx;
import React, { useState } from "react";
import Head from "next/head";

const DefencePage = () => {
  const [activeTab, setActiveTab] = useState("nda");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const examsData = {
    nda: {
      title: "National Defence Academy (NDA)",
      description: "Join the tri-services academy of Indian Armed Forces",
      eligibility: "Class 12 pass, 16.5-19.5 years",
      selection: "Written exam + SSB interview",
      attempts: "Unlimited till age limit",
      pattern: "Mathematics & General Ability Test",
    },
    cds: {
      title: "Combined Defence Services (CDS)",
      description: "Officer entry into Indian Military, Naval & Air Force Academies",
      eligibility: "Graduate, 19-24 years",
      selection: "Written exam + SSB interview",
      attempts: "Unlimited till age limit",
      pattern: "English, GK & Mathematics",
    },
    afcat: {
      title: "Air Force Common Admission Test (AFCAT)",
      description: "Entry into Flying, Technical & Ground Duty branches of IAF",
      eligibility: "Graduate, 20-26 years",
      selection: "AFCAT + EKT + SSB interview",
      attempts: "Unlimited till age limit",
      pattern: "General Awareness, Verbal, Numerical Ability & Military Aptitude",
    },
    capf: {
      title: "Central Armed Police Forces (CAPF)",
      description: "Officer level entry into paramilitary forces",
      eligibility: "Graduate, 20-25 years",
      selection: "Written exam + Physical test + Interview",
      attempts: "6 attempts",
      pattern: "General Ability, General Studies & Essay",
    },
  };

  const defenceHighlights = [
    "Complete coverage for NDA, CDS, AFCAT & CAPF",
    "Hybrid mode: Offline + Online support",
    "Weekly mock tests with All India Ranking",
    "Guidance from Defence Experts & Ex-Servicemen",
    "Updated Study Material & Previous Year Papers",
    "SSB Interview & Physical Training",
    "Scholarship programs for meritorious students",
    "Affordable fees with EMI options",
  ];

  const courseStructure = [
    {
      title: "Written Exam Preparation",
      desc: "Detailed coverage of Maths, English, GK, Science & Current Affairs with practice problems, DPPs & doubt clearing.",
      icon: "📝",
    },
    {
      title: "Physical Training",
      desc: "Special focus on running, push-ups, sit-ups, and endurance to help students meet defence physical standards.",
      icon: "💪",
    },
    {
      title: "SSB Interview Guidance",
      desc: "Mock interviews, group discussions, and psychological tests practice with defence mentors.",
      icon: "🎤",
    },
    {
      title: "Mock Tests & Assessments",
      desc: "Weekly & monthly tests with AIR ranking and performance analysis reports.",
      icon: "📊",
    },
  ];

  const pricingPlans = [
    {
      plan: "NDA Foundation",
      price: "₹24,999",
      duration: "6 Months",
      features: ["Full Syllabus", "Weekly Tests", "SSB Basics", "Study Materials"],
      popular: false,
    },
    {
      plan: "CDS Complete",
      price: "₹34,999",
      duration: "1 Year",
      features: ["Written + Physical", "Mentor Guidance", "Full Mock Tests", "Scholarship upto 30%"],
      popular: true,
    },
    {
      plan: "AFCAT + CAPF",
      price: "₹29,999",
      duration: "9 Months",
      features: ["Complete Written Prep", "Current Affairs Focus", "Doubt Sessions", "Recorded Lectures"],
      popular: false,
    },
    {
      plan: "Combo Package",
      price: "₹49,999",
      duration: "1.5 Years",
      features: ["All Defence Exams", "Personal Mentor", "Unlimited Tests", "Priority Support"],
      popular: false,
    },
  ];

  const faculty = [
    { 
      name: "Col. R.K. Sharma (Retd.)", 
      role: "SSB Interview Expert",
      experience: "32+ years in Army",
      image: "/placeholder-avatar.jpg" 
    },
    { 
      name: "Prof. Anjali Mehra", 
      role: "Mathematics & Reasoning",
      experience: "15+ years teaching experience",
      image: "/placeholder-avatar.jpg" 
    },
    { 
      name: "Dr. Aakash Gupta", 
      role: "General Knowledge & Current Affairs",
      experience: "PhD in Defence Studies",
      image: "/placeholder-avatar.jpg" 
    },
    { 
      name: "Maj. Vikram Singh", 
      role: "Physical Training Mentor",
      experience: "Special Forces Trainer",
      image: "/placeholder-avatar.jpg" 
    },
  ];

  const testimonials = [
    {
      name: "Rohit Kumar",
      role: "NDA 2023 Qualified",
      feedback: "Thanks to StudyLab, I cleared NDA written exam in my first attempt. Their test series and SSB guidance helped me a lot.",
      image: "/placeholder-avatar.jpg",
      rating: 5,
    },
    {
      name: "Advik Verma",
      role: "AFCAT 2023 Selected",
      feedback: "The hybrid mode was very helpful. Faculty guidance and regular mock tests built my confidence for AFCAT and SSB.",
      image: "/placeholder-avatar.jpg",
      rating: 5,
    },
    {
      name: "Amit Singh",
      role: "CDS 2023 Qualified",
      feedback: "The current affairs classes and physical training guidance were exceptional. Cleared my SSB in first attempt!",
      image: "/placeholder-avatar.jpg",
      rating: 4,
    },
  ];

  const defenceFaqs = [
    {
      q: "Who can join Defence Exam courses?",
      a: "Any aspirant preparing for NDA, CDS, AFCAT, or CAPF exams can enroll. We have specific programs for students in Class 11/12 as well as graduates.",
    },
    {
      q: "Is physical training included?",
      a: "Yes, we provide comprehensive physical training sessions including running, push-ups, sit-ups and other exercises needed to meet defence physical standards. Special SSB guidance is also part of the program.",
    },
    {
      q: "Do you provide test series separately?",
      a: "Yes, we offer both integrated courses and separate test series packages. Our test series includes weekly and monthly mock tests with All India Ranking and detailed performance analysis.",
    },
    {
      q: "Are scholarships available?",
      a: "Yes, we offer merit-based scholarships up to 50% for exceptional students. We also have special discounts for defense background families.",
    },
    {
      q: "What makes your SSB training different?",
      a: "Our SSB training is led by retired armed forces officers who have served as SSB evaluators. We provide personalized attention, psychological test practice, group tasks, and personal interview simulations.",
    },
  ];

  const stats = [
    { value: "120+", label: "Selections in 2023" },
    { value: "98%", label: "Success Rate" },
    { value: "15+", label: "Years Experience" },
    { value: "10+", label:  "Expert Mentors " },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Defence Exams Preparation | NDA, CDS, AFCAT, CAPF</title>
        <meta name="description" content="Comprehensive preparation for Defence exams including NDA, CDS, AFCAT, and CAPF with expert guidance, physical training and SSB interview preparation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Defence Exams Preparation</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Your complete guide to NDA, CDS, AFCAT, and CAPF exams with expert mentorship and proven success strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">
              Free Demo Class
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Tabs Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Defence Exams We Cover</h2>
          
          <div className="flex flex-wrap justify-center mb-8">
            {Object.keys(examsData).map((examKey) => (
              <button
                key={examKey}
                className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === examKey ? 'bg-white text-blue-700' : 'bg-gray-300 text-gray-700'}`}
                onClick={() => setActiveTab(examKey)}
              >
                {examKey.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">{examsData[activeTab].title}</h3>
                <p className="text-gray-700 mb-4">{examsData[activeTab].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Eligibility</h4>
                    <p className="text-gray-600">{examsData[activeTab].eligibility}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Selection Process</h4>
                    <p className="text-gray-600">{examsData[activeTab].selection}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Attempts Allowed</h4>
                    <p className="text-gray-600">{examsData[activeTab].attempts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Exam Pattern</h4>
                    <p className="text-gray-600">{examsData[activeTab].pattern}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-4">Upcoming Exam Dates</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Notification Date</span>
                    <span className="font-semibold">15 Dec 2023</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Exam Date</span>
                    <span className="font-semibold">21 Apr 2024</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>SSB Dates</span>
                    <span className="font-semibold">Jun-Jul 2024</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                  Download Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Defence Program?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defenceHighlights.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                  <span className="text-blue-700 text-xl">✓</span>
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Comprehensive Program</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseStructure.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Pricing & Plans</h2>
          <p className="text-center text-gray-600 mb-12">Choose the perfect plan for your defence career goals</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition ${plan.popular ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-center text-blue-700 mb-2">{plan.plan}</h3>
                  <div className="text-3xl font-bold text-center text-gray-800 mb-2">{plan.price}</div>
                  <div className="text-center text-gray-600 mb-6">{plan.duration}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition`}>
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">EMI options available • Scholarship tests every month</p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Learn From The Best Mentors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <span className="text-5xl">👤</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-2">{member.experience}</p>
                  
                  <div className="flex mt-4 space-x-2">
                    <button className="flex-1 bg-blue-50 text-blue-700 py-2 text-sm rounded-lg hover:bg-blue-100 transition">
                      Profile
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 text-sm rounded-lg hover:bg-gray-200 transition">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            {defenceFaqs.map((faq, idx) => (
              <div key={idx} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full p-4 text-left bg-white font-medium text-gray-800 flex justify-between items-center"
                  onClick={() => toggleFaq(idx)}
                >
                  {faq.q}
                  <span className="text-blue-600 text-xl">{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                
                {expandedFaq === idx && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Defence Journey Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of successful defence aspirants who achieved their dreams with our guidance</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">
              Book Free Counselling
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition">
              Call Now: +91-9876543210
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefencePage;