// src/pages/UPSC.jsx
import React, { useState } from "react";

const upscData = [
  {
    title: "Preliminary Exam (CSAT + General Studies)",
    topics: [
      {
        title: "Current Affairs",
        subTopics: [],
      },
      {
        title: "History of India",
        subTopics: [
          { title: "Ancient", items: ["Indus Valley Civilization", "Vedic Period", "Mauryan Empire", "Gupta Empire", "Post-Gupta Kingdoms"] },
          { title: "Medieval", items: ["Delhi Sultanate", "Mughal Empire", "Regional Kingdoms", "Bhakti & Sufi Movements"] },
          { title: "Modern", items: ["Advent of Europeans", "British East India Company", "1857 Revolt", "Freedom Struggle", "Partition & Independence"] },
        ],
      },
      {
        title: "Indian Polity & Governance",
        subTopics: [
          { title: "Constitution", items: ["Preamble", "Fundamental Rights & Duties", "Directive Principles"] },
          { title: "Parliament & State Legislatures", items: ["Lok Sabha & Rajya Sabha", "State Assemblies"] },
          { title: "Executive & Judiciary", items: ["President", "PM & Council of Ministers", "Supreme Court"] },
        ],
      },
      {
        title: "Geography",
        subTopics: [
          { title: "Physical", items: ["Landforms", "Climate", "Rivers", "Oceans"] },
          { title: "Indian", items: ["Physiography", "Rivers & Lakes", "Natural Resources"] },
          { title: "World", items: ["Continents", "Countries", "Geopolitics"] },
        ],
      },
      { title: "Economy", subTopics: [] },
      { title: "Environment & Ecology", subTopics: [] },
      { title: "Science & Technology", subTopics: [] },
      { title: "Disaster Management", subTopics: [] },
      { title: "Ethics & Integrity", subTopics: [] },
      {
        title: "General Mental Ability / CSAT (Paper 2)",
        subTopics: [
          { title: "Logical Reasoning", items: [] },
          { title: "Analytical Ability", items: [] },
          { title: "Comprehension", items: [] },
          { title: "Decision Making", items: [] },
          { title: "Basic Numeracy", items: [] },
        ],
      },
    ],
  },
  {
    title: "Mains Exam Subjects",
    topics: [
      {
        title: "Paper 1: Essay",
        subTopics: [{ title: "Essay Writing", items: ["Topics of national/international importance"] }],
      },
      {
        title: "Paper 2: General Studies I",
        subTopics: [
          { title: "Indian Culture", items: [] },
          { title: "Modern Indian History", items: [] },
          { title: "World History (brief)", items: [] },
          { title: "Indian & World Geography", items: [] },
        ],
      },
      {
        title: "Paper 3: General Studies II",
        subTopics: [
          { title: "Indian Constitution", items: [] },
          { title: "Governance", items: [] },
          { title: "Polity", items: [] },
          { title: "Social Justice", items: [] },
          { title: "International Relations", items: [] },
        ],
      },
      {
        title: "Paper 4: General Studies III",
        subTopics: [
          { title: "Economic Development", items: [] },
          { title: "Agriculture", items: [] },
          { title: "Science & Technology", items: [] },
          { title: "Environment & Biodiversity", items: [] },
          { title: "Security Issues", items: [] },
          { title: "Disaster Management", items: [] },
        ],
      },
      {
        title: "Paper 5: General Studies IV",
        subTopics: [
          { title: "Ethics in Public Administration", items: [] },
          { title: "Human Values", items: [] },
          { title: "Attitude & Aptitude", items: [] },
          { title: "Emotional Intelligence", items: [] },
          { title: "Probity in Governance", items: [] },
        ],
      },
      {
        title: "Papers 6 & 7: Optional Subjects",
        subTopics: [
          { title: "Popular Optional Subjects", items: [
            "Agriculture","Anthropology","Botany","Chemistry","Civil Engineering","Commerce & Accountancy",
            "Economics","Electrical Engineering","Geography","Geology","History","Law","Management","Mathematics",
            "Mechanical Engineering","Medical Science","Philosophy","Physics","Political Science & IR","Psychology",
            "Public Administration","Sociology","Statistics","Zoology"
          ] },
        ],
      },
    ],
  },
  {
    title: "Resources & Important Books",
    topics: [
      {
        title: "Prelims Resources",
        subTopics: [
          { title: "Books", items: ["NCERT 6-12 History, Geography, Economics, Science", "Indian Polity by M. Laxmikanth", "Certificate Physical and Human Geography by G.C. Leong"] },
          { title: "Current Affairs", items: ["The Hindu / Indian Express", "PIB", "Yojana / Kurukshetra Magazine"] },
        ],
      },
      {
        title: "Mains Resources",
        subTopics: [
          { title: "Books", items: ["Indian Art & Culture by Nitin Singhania", "Modern India by Bipin Chandra", "Indian Economy by Ramesh Singh"] },
          { title: "Optional Subjects References", items: ["Refer standard textbooks for respective optional subjects"] },
        ],
      },
    ],
  },
];

const TopicItem = ({ topic }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 flex justify-between items-center"
      >
        <span>{topic.title}</span>
        <span>{open ? "-" : "+"}</span>
      </div>
      {open &&
        topic.subTopics.map((sub, idx) => (
          <div key={idx} className="pl-8 mt-2">
            <div className="font-semibold">{sub.title}</div>
            {sub.items.length > 0 && (
              <ul className="list-disc pl-5 mt-1">
                {sub.items.map((item, idy) => (
                  <li key={idy}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
};

const UPSC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">UPSC Subjects & Resources</h1>
      {upscData.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
          {section.topics.map((topic, tIdx) => (
            <TopicItem key={tIdx} topic={topic} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default UPSC;
