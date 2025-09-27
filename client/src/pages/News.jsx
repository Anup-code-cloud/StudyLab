// pages/News.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Search,
  Flame,
  Clock,
  Bookmark,
  BookmarkPlus,
  Link as LinkIcon,
  Filter,
  Loader2,
  RefreshCw,
  X,
  Globe,
  Rocket,
  GraduationCap,
  Cpu,
  Trophy,
} from "lucide-react";

/**
 * 🔎 How data loads
 * -----------------------------------------
 * This page supports two ways to get news:
 * 1) FRONTEND → NewsAPI.org directly (requires VITE_NEWS_API_KEY)
 * 2) FRONTEND → your own backend at /api/news (recommended for production)
 *
 * By default, it will:
 * - Use process.env.VITE_NEWS_API_KEY if present
 * - Else it will fall back to a small local mock so UI still works
 *
 * Swap fetchNews() implementation if you have a custom API.
 */

const CATEGORIES = [
  { key: "top", label: "Top", icon: Newspaper },
  { key: "india", label: "India", icon: Globe },
  { key: "world", label: "World", icon: Globe },
  { key: "technology", label: "Tech", icon: Cpu },
  { key: "science", label: "Science", icon: Rocket },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "sports", label: "Sports", icon: Trophy },
];

const SORTS = [
  { key: "publishedAt", label: "Latest", icon: Clock },
  { key: "popularity", label: "Popular", icon: Flame },
  { key: "relevancy", label: "Relevant", icon: Filter },
];

// Local fallback sample so the UI renders without a key
const SAMPLE = [
  {
    title: "CBSE launches new academic guidelines for 2025",
    description:
      "CBSE announces competency-based assessment changes for Classes 10 & 12; teachers get new exemplar bank.",
    url: "https://example.com/edu-cbse-2025",
    urlToImage:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1400&auto=format&fit=crop",
    source: { name: "EduTimes" },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    author: "Desk",
  },
  {
    title: "ISRO tests reusable rocket stage prototype",
    description: "Milestone toward low-cost space access; next hop test scheduled soon.",
    url: "https://example.com/isro-reusability",
    urlToImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop",
    source: { name: "SpaceWire" },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: "Science Desk",
  },
  {
    title: "NEET 2026 proposed pattern – what may change",
    description: "Exam reforms under consideration; syllabus alignment with NCERT latest edition.",
    url: "https://example.com/neet-2026",
    urlToImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1400&auto=format&fit=crop",
    source: { name: "ExamWatch" },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    author: "Reporter",
  },
];

function useDebouncedValue(value, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

async function fetchNews({ query, category, sortBy, page }) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  // Prefer your own backend if available
  try {
    const res = await fetch(
      `/api/news?q=${encodeURIComponent(query || "")}&category=${category || ""}&sortBy=${sortBy || "publishedAt"}&page=${page || 1}`,
      { method: "GET" }
    );
    if (res.ok) {
      const data = await res.json();
      return data?.articles || [];
    }
  } catch (e) {
    // ignore and try NewsAPI or SAMPLE
  }

  // Direct NewsAPI fallback (client-side). Rate-limited; use only for development.
  if (apiKey) {
    // Map category to a query for NewsAPI Everything endpoint
    const qCat =
      category === "top"
        ? "(education OR exam OR cbse OR isc OR jee OR neet OR upsc OR ugc)"
        : category;
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query ? `${query}` : qCat || "education");
    url.searchParams.set("pageSize", "12");
    url.searchParams.set("page", String(page || 1));
    url.searchParams.set("sortBy", sortBy || "publishedAt");
    url.searchParams.set("language", "en");

    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!res.ok) throw new Error("NewsAPI error");
    const data = await res.json();
    return data?.articles || [];
  }

  // Last resort: local sample
  return SAMPLE;
}

function ArticleCard({ article, onOpen, bookmarked, onBookmark }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-shadow"
    >
      <div className="aspect-video w-full bg-gray-100 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400">
            <Newspaper className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start gap-3">
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            {article.source?.name || "Unknown"}
          </span>
          <span className="ml-auto text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleString()}
          </span>
        </div>
        <h3 className="font-semibold text-lg leading-snug line-clamp-2">{article.title}</h3>
        {article.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onOpen(article)}
            className="text-sm font-medium underline underline-offset-4 hover:no-underline"
          >
            Read more
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm inline-flex items-center gap-1"
          >
            <LinkIcon className="h-4 w-4" /> Open
          </a>
          <button
            onClick={() => onBookmark(article)}
            aria-label="bookmark"
            className={`p-2 rounded-full border hover:bg-gray-50 ${
              bookmarked ? "text-blue-600 border-blue-200" : "text-gray-600 border-gray-200"
            }`}
          >
            {bookmarked ? <Bookmark className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function News() {
  const [category, setCategory] = useState("top");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openArticle, setOpenArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem("studylab.news.bookmarks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const debouncedQ = useDebouncedValue(query, 500);
  const mounted = useRef(false);

  // Derive list of sources for a quick filter
  const sources = useMemo(() => {
    const s = new Set(articles.map((a) => a.source?.name).filter(Boolean));
    return Array.from(s).slice(0, 10);
  }, [articles]);
  const [sourceFilter, setSourceFilter] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((a) =>
      sourceFilter ? a.source?.name === sourceFilter : true
    );
  }, [articles, sourceFilter]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    setPage(1);
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy, debouncedQ]);

  async function load(reset = false) {
    try {
      setLoading(true);
      setError("");
      const data = await fetchNews({ query: debouncedQ, category, sortBy, page: reset ? 1 : page });
      if (reset) {
        setArticles(data);
        setPage(2);
      } else {
        setArticles((prev) => [...prev, ...data]);
        setPage((p) => p + 1);
      }
    } catch (e) {
      setError(e?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }

  function toggleBookmark(article) {
    setBookmarks((prev) => {
      const exists = prev.find((a) => a.url === article.url);
      const next = exists ? prev.filter((a) => a.url !== article.url) : [article, ...prev];
      localStorage.setItem("studylab.news.bookmarks", JSON.stringify(next));
      return next;
    });
  }

  const isBookmarked = (url) => bookmarks.some((b) => b.url === url);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="h-7 w-7" />
        <h1 className="text-2xl sm:text-3xl font-bold">StudyLab News</h1>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-4">
        {/* Category pills */}
        <div className="md:col-span-8 overflow-x-auto -mx-1 px-1 py-1 flex gap-2">
          {CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border transition ${
                category === key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="md:col-span-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none px-3 py-2 pr-8 rounded-xl border bg-white"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Search */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, exams, colleges..."
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* Source filter & bookmarks toggle */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Source:</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2 py-1 rounded-lg border bg-white text-sm"
          >
            <option value="">All</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => load(true)}
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Content grid */}
      {error && (
        <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredArticles.map((a) => (
            <ArticleCard
              key={a.url}
              article={a}
              onOpen={setOpenArticle}
              bookmarked={isBookmarked(a.url)}
              onBookmark={toggleBookmark}
            />) 
          ) }
        </AnimatePresence>
      </div>

      {/* Load more / Loading */}
      <div className="flex justify-center py-6">
        {loading ? (
          <div className="inline-flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : (
          <button
            onClick={() => load(false)}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
          >
            Load more
          </button>
        )}
      </div>

      {/* Drawer / Modal */}
      <AnimatePresence>
        {openArticle && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenArticle(null)}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:top-10 md:bottom-auto md:w-[720px] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  <span className="text-sm text-gray-600">{openArticle.source?.name}</span>
                </div>
                <button
                  onClick={() => setOpenArticle(null)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {openArticle.urlToImage && (
                <img
                  src={openArticle.urlToImage}
                  alt={openArticle.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold leading-snug">
                  {openArticle.title}
                </h2>
                {openArticle.author && (
                  <p className="text-sm text-gray-600">By {openArticle.author}</p>
                )}
                <p className="text-gray-700">{openArticle.description}</p>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={openArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
                  >
                    <LinkIcon className="h-4 w-4" /> Read full story
                  </a>
                  <button
                    onClick={() => toggleBookmark(openArticle)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
                  >
                    <Bookmark className="h-4 w-4" /> {isBookmarked(openArticle.url) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookmarks drawer */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Your Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p className="text-sm text-gray-600">No bookmarks yet. Save articles to read later.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((a) => (
              <ArticleCard
                key={a.url}
                article={a}
                onOpen={setOpenArticle}
                bookmarked={true}
                onBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
