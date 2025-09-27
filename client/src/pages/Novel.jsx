// pages/BookStore.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Example categories
const categories = [
  { name: "Fiction", color: "bg-gradient-to-r from-purple-400 to-purple-600" },
  { name: "Non-Fiction", color: "bg-gradient-to-r from-green-400 to-green-600" },
  { name: "Self-Help", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
  { name: "Science", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
  { name: "History", color: "bg-gradient-to-r from-orange-400 to-orange-600" },
  { name: "Comics", color: "bg-gradient-to-r from-pink-400 to-pink-600" },
  { name: "Exam Prep", color: "bg-gradient-to-r from-red-400 to-red-600" },
  { name: "Novels", color: "bg-gradient-to-r from-indigo-400 to-indigo-600" },
];

// Example books
const books = [
  {
    title: "Atomic Habits",
    category: "Self-Help",
    author: "James Clear",
    price: 299,
    rating: 4.8,
    cover: "https://m.media-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    category: "Fiction",
    author: "J.K. Rowling",
    price: 399,
    rating: 4.9,
    cover: "https://m.media-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
  },
  {
    title: "NCERT Physics Class 12",
    category: "Exam Prep",
    author: "NCERT",
    price: 150,
    rating: 4.5,
    cover: "https://images-na.ssl-images-amazon.com/images/I/41Uq6N2L1NL._SX331_BO1,204,203,200_.jpg",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    category: "History",
    author: "Yuval Noah Harari",
    price: 499,
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/I/41XoJ+F0VML._SX331_BO1,204,203,200_.jpg",
  },
  {
    title: "Marvel Comics: Spider-Man",
    category: "Comics",
    author: "Marvel",
    price: 250,
    rating: 4.6,
    cover: "https://images-na.ssl-images-amazon.com/images/I/51m0f8kF4hL._SX331_BO1,204,203,200_.jpg",
  },
  {
    title: "The Power of Habit",
    category: "Self-Help",
    author: "Charles Duhigg",
    price: 349,
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/I/51ejXdSceNL._SX329_BO1,204,203,200_.jpg",
  },
  {
    title: "Chemistry Class 11 NCERT",
    category: "Exam Prep",
    author: "NCERT",
    price: 180,
    rating: 4.4,
    cover: "https://images-na.ssl-images-amazon.com/images/I/41I6Q1d+0uL._SX331_BO1,204,203,200_.jpg",
  },
  {
    title: "The Alchemist",
    category: "Fiction",
    author: "Paulo Coelho",
    price: 299,
    rating: 4.6,
    cover: "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX327_BO1,204,203,200_.jpg",
  },
];

function BookStore() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter books based on search and category
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          StudyLab Bookstore
        </h1>
        <p className="text-gray-600">
          Explore thousands of books, guides, and resources across all categories.
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 relative">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-4 rounded-xl shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "All"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-white ${
              selectedCategory === cat.name ? "shadow-lg scale-105" : ""
            } ${cat.color} hover:opacity-90 transition`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{book.author}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-500 font-bold">{book.rating} ★</span>
                <span className="text-blue-600 font-semibold">₹{book.price}</span>
              </div>
              <Link
                to={`/books/${book.title.replace(/\s+/g, "-")}`}
                className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-xl text-center hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No books found for "{search}" in "{selectedCategory}".
          </div>
        )}
      </section>
    </div>
  );
}

export default BookStore;
