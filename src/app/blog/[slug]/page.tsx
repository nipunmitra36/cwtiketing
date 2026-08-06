"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

// ── Types ─────────────────────────────────────────────────────────────────────
interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  accent: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const POST = {
  title: "Advanced App Router Patterns in Next.js 14",
  excerpt:
    "Explore server components, parallel routes, intercepting routes, and how to architect large-scale applications without prop drilling.",
  category: "Next.js",
  readTime: "8 min",
  date: "May 3, 2025",
  accent: "bg-violet-50 text-violet-700",
  accentBorder: "border-violet-200",
  accentSolid: "bg-violet-600",
  author: {
    name: "Nipun Dev",
    initials: "ND",
    role: "Full-Stack Engineer",
    color: "bg-violet-500",
    bio: "Building scalable web products with Next.js, TypeScript, and a passion for clean architecture.",
  },
  tags: ["Next.js", "App Router", "React", "TypeScript", "Architecture"],
  tableOfContents: [
    { id: "intro", label: "Introduction" },
    { id: "server-components", label: "Server Components" },
    { id: "parallel-routes", label: "Parallel Routes" },
    { id: "intercepting-routes", label: "Intercepting Routes" },
    { id: "patterns", label: "Architectural Patterns" },
    { id: "conclusion", label: "Conclusion" },
  ],
  sections: [
    {
      id: "intro",
      heading: "Introduction",
      body: `The Next.js App Router, introduced in v13 and stabilised in v14, fundamentally changes how we think about React applications. Instead of a single client-side component tree, you now compose a hybrid graph of server and client components — each rendered in the most efficient environment for its job.\n\nThis guide assumes you're comfortable with React fundamentals and have a basic Next.js project running. We'll go deep on the patterns that make the App Router shine at scale.`,
      code: null,
    },
    {
      id: "server-components",
      heading: "Server Components",
      body: `React Server Components (RSC) run exclusively on the server. They can read files, query databases, and call APIs directly — with zero JavaScript shipped to the browser for the component itself. The key insight: async/await works natively inside any server component.`,
      code: `// app/blog/page.tsx — pure Server Component
export default async function BlogPage() {
  // Direct DB call — no useEffect, no loading state
  const posts = await db.post.findMany({ orderBy: { date: "desc" } });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
    },
    {
      id: "parallel-routes",
      heading: "Parallel Routes",
      body: `Parallel routes let you render multiple pages in the same layout simultaneously using named slots (folders prefixed with @). Each slot streams independently, so a slow sidebar won't block a fast main panel.`,
      code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,   // @analytics slot
  team,        // @team slot
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <main className="col-span-2">{children}</main>
      <aside className="space-y-4">
        {analytics}
        {team}
      </aside>
    </div>
  );
}`,
    },
    {
      id: "intercepting-routes",
      heading: "Intercepting Routes",
      body: `Intercepting routes (.) (..) (...) allow you to load a route within the context of the current layout — perfect for modals that should be deep-linkable. Navigate directly to /photo/42 and you get the full page; click it from the gallery and it renders in a modal.`,
      code: `// app/gallery/@modal/(.)photo/[id]/page.tsx
import { PhotoModal } from "@/components/PhotoModal";

export default function InterceptedPhoto({ params }: { params: { id: string } }) {
  return <PhotoModal id={params.id} />;
}

// app/gallery/photo/[id]/page.tsx  ← full-page fallback
export default function FullPhoto({ params }: { params: { id: string } }) {
  return <PhotoPage id={params.id} />;
}`,
    },
    {
      id: "patterns",
      heading: "Architectural Patterns",
      body: `Combining these primitives unlocks composable, scalable architectures:\n\n**Data ownership at the leaf** — push data fetching as close to the component that needs it as possible. Avoid prop drilling by letting server components fetch their own data.\n\n**Collocated mutations** — use Server Actions defined in the same file as the form. No separate API route, no manual fetch.\n\n**Streaming with Suspense** — wrap expensive server components in <Suspense fallback={<Skeleton />}> to stream HTML progressively. Users see content instantly instead of waiting for the slowest query.`,
      code: `// Collocated Server Action
async function createPost(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
  revalidatePath("/blog");
}

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" />
      <button type="submit">Publish</button>
    </form>
  );
}`,
    },
    {
      id: "conclusion",
      heading: "Conclusion",
      body: `The App Router isn't just a new file convention — it's a new mental model. Embrace the server/client boundary, lean into co-location, and let Suspense handle the loading states you used to write by hand.\n\nStart small: migrate one route, add one Server Action, wrap one slow component in Suspense. The architecture compounds quickly, and your codebase will thank you.`,
      code: null,
    },
  ],
};

const RELATED: RelatedPost[] = [
  {
    slug: "react-19-use-hook",
    title: "React 19's `use()` Hook Changes Everything",
    category: "React",
    readTime: "7 min",
    accent: "bg-cyan-50 text-cyan-700",
  },
  {
    slug: "typescript-satisfies-operator",
    title: "The `satisfies` Operator You Should Be Using",
    category: "TypeScript",
    readTime: "5 min",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    slug: "tailwind-v4-deep-dive",
    title: "Tailwind CSS v4 — What Actually Changed",
    category: "CSS",
    readTime: "6 min",
    accent: "bg-sky-50 text-sky-700",
  },
];

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
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(148);
  const [activeId, setActiveId] = useState("intro");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Reading progress + active TOC section
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);

      POST.tableOfContents.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) setActiveId(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
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
      <header className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0.05)} className="mb-5 flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${POST.accent}`}>
            {POST.category}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <HiOutlineClock className="h-3.5 w-3.5" />
            {POST.readTime} read
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <HiOutlineCalendar className="h-3.5 w-3.5" />
            {POST.date}
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="mb-5 text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          {POST.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.11)}
          className="mb-8 max-w-2xl text-[15px] leading-relaxed text-gray-500"
        >
          {POST.excerpt}
        </motion.p>

        {/* Author + actions row */}
        <motion.div
          {...fadeUp(0.13)}
          className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-100 py-4"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white ${POST.author.color}`}
            >
              {POST.author.initials}
            </span>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">{POST.author.name}</p>
              <p className="text-[11px] text-gray-400">{POST.author.role}</p>
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
        className="mx-auto mb-12 max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand-hover to-brand-dark p-12 shadow-lg">
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
          <p className="relative text-[15px] font-medium leading-relaxed text-white/90 lg:text-[17px]">
            "{POST.excerpt}"
          </p>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex gap-12">

          {/* Sticky TOC — desktop only */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-24">
              <TableOfContents items={POST.tableOfContents} activeId={activeId} />
            </div>
          </aside>

          {/* Article content */}
          <article ref={articleRef} className="min-w-0 flex-1 pb-20">
            {POST.sections.map((section, i) => (
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
              {POST.tags.map((tag) => (
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
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${POST.author.color}`}
              >
                {POST.author.initials}
              </span>
              <div>
                <p className="mb-0.5 text-[14px] font-medium text-gray-900">{POST.author.name}</p>
                <p className="mb-2 text-[12px] text-gray-400">{POST.author.role}</p>
                <p className="text-[13px] leading-relaxed text-gray-500">{POST.author.bio}</p>
              </div>
            </div>

            {/* Related posts */}
            <div>
              <h3 className="mb-5 text-[15px] font-medium text-gray-900">Related articles</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {RELATED.map((r) => (
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