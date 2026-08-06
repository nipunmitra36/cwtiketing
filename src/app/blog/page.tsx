"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineSearch,
  HiOutlineFire,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; initials: string; color: string };
  featured?: boolean;
  accent: string; // Tailwind bg class for category chip
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const POSTS: Post[] = [
  {
    slug: "nextjs-app-router-patterns",
    title: "Advanced App Router Patterns in Next.js 14",
    excerpt:
      "Explore server components, parallel routes, intercepting routes, and how to architect large-scale applications without prop drilling.",
    category: "Next.js",
    readTime: "8 min",
    date: "May 3, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-violet-500" },
    featured: true,
    accent: "bg-violet-50 text-violet-700",
  },
  {
    slug: "tailwind-v4-deep-dive",
    title: "Tailwind CSS v4 — What Actually Changed",
    excerpt:
      "A practical breakdown of the new CSS-first config, composable variants, and the oxide engine that makes builds 10× faster.",
    category: "CSS",
    readTime: "6 min",
    date: "Apr 28, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-sky-500" },
    accent: "bg-sky-50 text-sky-700",
  },
  {
    slug: "typescript-satisfies-operator",
    title: "The `satisfies` Operator You Should Be Using",
    excerpt:
      "Stop using `as` for everything. The satisfies operator preserves literal types while validating shape — here's when and why.",
    category: "TypeScript",
    readTime: "5 min",
    date: "Apr 19, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-blue-500" },
    accent: "bg-blue-50 text-blue-700",
  },
  {
    slug: "react-19-use-hook",
    title: "React 19's `use()` Hook Changes Everything",
    excerpt:
      "Promises, context, and async data directly inside render — no more waterfall useEffects or redundant loading states.",
    category: "React",
    readTime: "7 min",
    date: "Apr 10, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-cyan-500" },
    accent: "bg-cyan-50 text-cyan-700",
  },
  {
    slug: "framer-motion-layout-animations",
    title: "Buttery-Smooth Layout Animations with Framer Motion",
    excerpt:
      "layoutId, AnimatePresence, and shared element transitions explained with real production examples you can copy right now.",
    category: "Animation",
    readTime: "9 min",
    date: "Mar 31, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-pink-500" },
    accent: "bg-pink-50 text-pink-700",
  },
  {
    slug: "prisma-edge-runtime",
    title: "Running Prisma on the Edge Without Losing Your Mind",
    excerpt:
      "Prisma Accelerate, connection pooling, and the edge-compatible driver — setting it all up in a Next.js project from scratch.",
    category: "Database",
    readTime: "11 min",
    date: "Mar 22, 2025",
    author: { name: "Nipun Dev", initials: "ND", color: "bg-emerald-500" },
    accent: "bg-emerald-50 text-emerald-700",
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

// ── Animation helpers ─────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
});

// ── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.article {...fadeUp(0.05)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg lg:flex-row"
      >
        {/* Colour slab */}
        <div className="relative flex min-h-52 w-full shrink-0 items-end bg-gradient-to-br from-brand via-brand-hover to-brand-dark p-8 lg:w-80 lg:min-h-full">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            <HiOutlineFire className="h-3.5 w-3.5" />
            Featured
          </span>
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${post.accent}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <HiOutlineClock className="h-3.5 w-3.5" />
              {post.readTime} read
            </span>
            <span className="text-[12px] text-gray-400">{post.date}</span>
          </div>

          <h2 className="mb-3 text-2xl font-medium leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-brand lg:text-3xl">
            {post.title}
          </h2>
          <p className="mb-6 text-[14px] leading-relaxed text-gray-500">{post.excerpt}</p>

          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            Read article
            <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article {...fadeUp(0.06 + index * 0.05)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      >
        {/* Top row */}
        <div className="mb-4 flex items-center justify-between">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${post.accent}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <HiOutlineClock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 flex-1 text-[15px] font-medium leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-gray-700">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 line-clamp-2 text-[13px] leading-relaxed text-gray-500">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium text-white ${post.author.color}`}
            >
              {post.author.initials}
            </span>
            <span className="text-[12px] font-medium text-gray-600">{post.author.name}</span>
          </div>
          <span className="text-[11px] text-gray-400">{post.date}</span>
        </div>
      </Link>
    </motion.article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogListPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);

  const filtered = rest.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero header ── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-500">
              <HiOutlineTag className="h-3.5 w-3.5" />
              Writing & tutorials
            </span>
            <h1 className="mb-4 text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
              The Blog
            </h1>
            <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-gray-500">
              Deep-dives into Next.js, TypeScript, and modern web engineering — written for
              developers who care about the details.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div {...fadeUp(0.1)} className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

        {/* ── Category pills ── */}
        <motion.div {...fadeUp(0.05)} className="mb-10 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-brand text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Featured (only when "All" + no search) ── */}
        {activeCategory === "All" && query === "" && (
          <div className="mb-10">
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center"
          >
            <HiOutlineSearch className="mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">No articles found</p>
            <p className="mt-1 text-[12px] text-gray-400">
              Try a different keyword or category
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="mt-4 rounded-lg border border-gray-200 px-4 py-1.5 text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* ── Load more stub ── */}
        {filtered.length > 0 && (
          <motion.div {...fadeUp(0.2)} className="mt-14 text-center">
            <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-[13.5px] font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow active:scale-95">
              Load more articles
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}