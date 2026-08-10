"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { POSTS } from "../posts";
import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineThumbUp,
  HiOutlineLink,
  HiOutlineChevronUp,
  HiOutlineTag,
} from "react-icons/hi";
// import {
//   SiTwitter,
//   SiLinkedin,
// } from "react-icons/si";

// ── Helpers ───────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay } },
});

// ── Code Block ────────────────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <HiOutlineLink className="h-3.5 w-3.5" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── TOC ───────────────────────────────────────────────────────────────────────
function TableOfContents({
  items,
  activeId,
}: {
  items: { id: string; label: string }[];
  activeId: string;
}) {
  return (
    <nav className="space-y-1">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
            activeId === item.id
              ? "bg-brand-light font-semibold text-brand"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === params.slug) ?? POSTS[0];

  const related = useMemo(() => {
    const others = POSTS.filter((p) => p.slug !== post.slug);
    const sameCat = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    return [...sameCat, ...rest].slice(0, 3);
  }, [post]);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(148);
  const [activeId, setActiveId] = useState("intro");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  // Pin the "On this page" TOC while scrolling through the article.
  // position: sticky is unreliable here because GSAP ScrollSmoother
  // transforms the content, so we pin via ScrollTrigger instead.
  useEffect(() => {
    const toc = tocRef.current;
    const article = articleRef.current;
    if (!toc || !article) return;

    const trigger = ScrollTrigger.create({
      trigger: article,
      start: "top 80",
      end: "bottom bottom",
      pin: toc,
      pinSpacing: false,
      anticipatePin: 1,
    });

    return () => trigger.kill();
  }, [post]);

  // Reading progress + active TOC section
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);

      post.tableOfContents.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) setActiveId(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  const handleLike = () => {
    setLiked((p) => !p);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Reading progress bar ── */}
      <div
        className="fixed left-0 top-0 z-50 h-[3px] bg-brand transition-all duration-100"
        style={{ width: `${scrollPct}%` }}
      />

      {/* ── Back link ── */}
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:pt-28 lg:px-8">
        <motion.div {...fadeUp(0)}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 transition hover:text-gray-900"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </motion.div>
      </div>

      {/* ── Hero ── */}
      <header className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0.05)} className="mb-5 flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${post.accent}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <HiOutlineClock className="h-3.5 w-3.5" />
            {post.readTime} read
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <HiOutlineCalendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="mb-5 text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          {post.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.11)}
          className="mb-8 max-w-2xl text-[15px] leading-relaxed text-gray-500"
        >
          {post.excerpt}
        </motion.p>

        {/* Author + actions row */}
        <motion.div
          {...fadeUp(0.13)}
          className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-100 py-4"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white ${post.author.color}`}
            >
              {post.author.initials}
            </span>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-[11px] text-gray-400">{post.author.role}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all active:scale-95 ${
                liked
                  ? "border-brand/30 bg-brand-light text-brand"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              <HiOutlineThumbUp className="h-3.5 w-3.5" />
              {likeCount}
            </button>
            <button
              onClick={() => setSaved((p) => !p)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all active:scale-95 ${
                saved
                  ? "border-brand/30 bg-brand-light text-brand"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              <HiOutlineBookmark className="h-3.5 w-3.5" />
              {saved ? "Saved" : "Save"}
            </button>
            {/* <div className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5">
              <HiOutlineShare className="h-3.5 w-3.5 text-gray-400" />
              <a
                href="https://twitter.com/intent/tweet"
                target="_blank"
                rel="noreferrer"
                className="p-0.5 text-gray-400 transition hover:text-[#1DA1F2]"
              >
                <SiTwitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://linkedin.com/shareArticle"
                target="_blank"
                rel="noreferrer"
                className="p-0.5 text-gray-400 transition hover:text-[#0A66C2]"
              >
                <SiLinkedin className="h-3.5 w-3.5" />
              </a>
            </div> */}
          </div>
        </motion.div>
      </header>

      {/* ── Hero colour band ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.15 } }}
        className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand-hover to-brand-dark p-12 shadow-lg">
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
          <p className="relative text-[15px] font-medium leading-relaxed text-white/90 lg:text-[17px]">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex gap-12">

          {/* Sticky TOC — desktop only */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div ref={tocRef}>
              <TableOfContents items={post.tableOfContents} activeId={activeId} />
            </div>
          </aside>

          {/* Article content */}
          <article ref={articleRef} className="min-w-0 flex-1 pb-20 xl:max-w-3xl">
            {post.sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                {...fadeUp(0.05 * i)}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="mb-4 text-xl font-medium tracking-tight text-gray-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-8 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ))}
                </div>
                {section.code && <CodeBlock code={section.code} />}
              </motion.section>
            ))}

            {/* Tags */}
            <div className="mb-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-8">
              <HiOutlineTag className="h-4 w-4 text-gray-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author bio card */}
            <div className="mb-14 flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${post.author.color}`}
              >
                {post.author.initials}
              </span>
              <div>
                <p className="mb-0.5 text-[14px] font-medium text-gray-900">{post.author.name}</p>
                <p className="mb-2 text-[12px] text-gray-400">{post.author.role}</p>
                <p className="text-[13px] leading-relaxed text-gray-500">{post.author.bio}</p>
              </div>
            </div>

            {/* Related posts */}
            <div>
              <h3 className="mb-5 text-[15px] font-medium text-gray-900">Related articles</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${r.accent}`}
                    >
                      {r.category}
                    </span>
                    <p className="mb-2 text-[13px] font-semibold leading-snug text-gray-900 group-hover:text-gray-700">
                      {r.title}
                    </p>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <HiOutlineClock className="h-3 w-3" />
                      {r.readTime} read
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ── Scroll to top ── */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:border-gray-300 hover:shadow-lg active:scale-95"
          aria-label="Scroll to top"
        >
          <HiOutlineChevronUp className="h-5 w-5 text-gray-600" />
        </motion.button>
      )}
    </div>
  );
}