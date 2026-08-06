"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineStar,
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineFire,
  HiOutlineTag,
  HiOutlineCheck,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: "New" | "Sale" | "Hot" | "Limited";
  color: string;
  description: string;
  tags: string[];
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const product: Product[] = [
  {
    id: 1,
    name: "Stellar Pro Wireless Headphones",
    category: "Audio",
    price: 249,
    originalPrice: 329,
    rating: 4.8,
    reviews: 1240,
    badge: "Sale",
    color: "from-slate-700 to-slate-900",
    description: "40-hour battery, active noise cancellation, premium drivers.",
    tags: ["wireless", "noise-cancelling", "premium"],
  },
  {
    id: 2,
    name: "Arc Mechanical Keyboard",
    category: "Peripherals",
    price: 189,
    rating: 4.9,
    reviews: 876,
    badge: "Hot",
    color: "from-zinc-600 to-zinc-900",
    description: "TKL layout, hot-swap switches, per-key RGB.",
    tags: ["mechanical", "RGB", "gaming"],
  },
  {
    id: 3,
    name: "Nomad 27\" 4K Monitor",
    category: "Displays",
    price: 699,
    rating: 4.7,
    reviews: 532,
    badge: "New",
    color: "from-gray-600 to-gray-900",
    description: "IPS panel, 144Hz, USB-C 90W, zero-bezel design.",
    tags: ["4K", "USB-C", "144Hz"],
  },
  {
    id: 4,
    name: "Orbit Ergonomic Mouse",
    category: "Peripherals",
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviews: 2100,
    badge: "Sale",
    color: "from-stone-500 to-stone-800",
    description: "Vertical grip, 8-button programmable, silent clicks.",
    tags: ["ergonomic", "wireless", "silent"],
  },
  {
    id: 5,
    name: "Lumex LED Desk Lamp",
    category: "Lighting",
    price: 129,
    rating: 4.5,
    reviews: 398,
    color: "from-amber-600 to-amber-900",
    description: "3000K–6500K tunable white, USB-C charging, memory mode.",
    tags: ["LED", "adjustable", "USB-C"],
  },
  {
    id: 6,
    name: "Zenith USB-C Hub 12-in-1",
    category: "Accessories",
    price: 59,
    rating: 4.4,
    reviews: 3200,
    badge: "Hot",
    color: "from-neutral-600 to-neutral-900",
    description: "HDMI 4K, SD card, 3× USB-A, 100W PD passthrough.",
    tags: ["USB-C", "hub", "4K"],
  },
  {
    id: 7,
    name: "Phantom Webcam 4K",
    category: "Audio",
    price: 219,
    originalPrice: 279,
    rating: 4.7,
    reviews: 710,
    badge: "Sale",
    color: "from-red-700 to-red-950",
    description: "Sony sensor, auto-framing, dual noise-cancelling mics.",
    tags: ["4K", "streaming", "auto-focus"],
  },
  {
    id: 8,
    name: "Vortex Laptop Stand",
    category: "Accessories",
    price: 49,
    rating: 4.3,
    reviews: 1850,
    badge: "New",
    color: "from-teal-600 to-teal-900",
    description: "Aluminium alloy, 6 height angles, foldable ultra-slim.",
    tags: ["aluminium", "portable", "ergonomic"],
  },
  {
    id: 9,
    name: "Echo Wireless Earbuds",
    category: "Audio",
    price: 149,
    rating: 4.6,
    reviews: 4500,
    badge: "Limited",
    color: "from-indigo-600 to-indigo-900",
    description: "ANC, 32hr total battery, IPX5, spatial audio support.",
    tags: ["ANC", "wireless", "IPX5"],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(product.map((p) => p.category)))];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

const BADGE_STYLES: Record<string, string> = {
  New: "bg-sky-50 text-sky-700 border-sky-200",
  Sale: "bg-rose-50 text-rose-700 border-rose-200",
  Hot: "bg-orange-50 text-orange-700 border-orange-200",
  Limited: "bg-violet-50 text-violet-700 border-violet-200",
};

const BADGE_ICONS: Record<string, React.ReactNode> = {
  New: <HiOutlineTag className="h-3 w-3" />,
  Sale: <HiOutlineTag className="h-3 w-3" />,
  Hot: <HiOutlineFire className="h-3 w-3" />,
  Limited: <HiOutlineTag className="h-3 w-3" />,
};

// ── Animations ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// ── Star Rating ───────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <HiOutlineStar
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find((o) => o.value === value)!;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-sm transition hover:border-gray-300"
      >
        {current.label}
        <HiOutlineChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE } }}
            exit={{ opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.12 } }}
            className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50 ${
                  o.value === value ? "font-semibold text-gray-900" : "text-gray-600"
                }`}
              >
                {o.label}
                {o.value === value && <HiOutlineCheck className="h-4 w-4 text-gray-900" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Product Card (Grid) ───────────────────────────────────────────────────────
function GridCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Image slab */}
      <Link
        href={`/product/${product.id}`}
        className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${product.color}`}
      >
        <span className="select-none text-8xl font-black text-white/10 transition-transform duration-500 group-hover:scale-110">
          {product.name[0]}
        </span>

        {product.badge && (
          <span
            className={`absolute left-3 top-3 flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${BADGE_STYLES[product.badge]}`}
          >
            {BADGE_ICONS[product.badge]}
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-medium text-white">
            -{discount}%
          </span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); setWished((p) => !p); }}
          className={`absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all active:scale-95 ${
            wished
              ? "border-rose-200 bg-white text-rose-500"
              : "border-white/30 bg-white/20 text-white opacity-0 backdrop-blur-sm group-hover:opacity-100"
          }`}
        >
          <HiOutlineHeart className={`h-4 w-4 ${wished ? "fill-rose-500" : ""}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="mb-1 text-[14px] font-medium leading-snug text-gray-900 transition-colors hover:text-gray-700">
            {product.name}
          </h3>
        </Link>
        <p className="mb-3 line-clamp-2 text-[12px] leading-relaxed text-gray-500">
          {product.description}
        </p>
        <div className="mb-3 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">
            {product.rating} · {product.reviews.toLocaleString()}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-[18px] font-medium text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-[12px] text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-semibold transition-all active:scale-95 ${
              added ? "bg-emerald-500 text-white" : "bg-brand text-white hover:bg-brand-hover"
            }`}
          >
            {added ? (
              <><HiOutlineCheck className="h-3.5 w-3.5" /> Added</>
            ) : (
              <><HiOutlineShoppingCart className="h-3.5 w-3.5" /> Add</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Product Card (List) ───────────────────────────────────────────────────────
function ListCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group flex gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <Link
        href={`/product/${product.id}`}
        className={`relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.color}`}
      >
        <span className="select-none text-4xl font-black text-white/20">{product.name[0]}</span>
        {product.badge && (
          <span
            className={`absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute bottom-1.5 right-1.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-medium text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            {product.category}
          </p>
          <Link href={`/product/${product.id}`}>
            <h3 className="mb-1 truncate text-[15px] font-medium text-gray-900 hover:text-gray-700">
              {product.name}
            </h3>
          </Link>
          <p className="mb-2 line-clamp-1 text-[13px] text-gray-500">{product.description}</p>
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-[12px] text-gray-400">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-[18px] font-medium text-gray-900">${product.price}</p>
          {product.originalPrice && (
            <p className="text-[12px] text-gray-400 line-through">${product.originalPrice}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWished((p) => !p)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-95 ${
              wished
                ? "border-rose-200 bg-rose-50 text-rose-500"
                : "border-gray-200 text-gray-400 hover:border-gray-300"
            }`}
          >
            <HiOutlineHeart className={`h-4 w-4 ${wished ? "fill-rose-500" : ""}`} />
          </button>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all active:scale-95 ${
              added ? "bg-emerald-500 text-white" : "bg-brand text-white hover:bg-brand-hover"
            }`}
          >
            {added ? (
              <><HiOutlineCheck className="h-4 w-4" /> Added</>
            ) : (
              <><HiOutlineShoppingCart className="h-4 w-4" /> Add</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductListPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [maxPrice, setMaxPrice] = useState(800);

  const filtered = useMemo(() => {
    let list = product.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQ =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQ && p.price <= maxPrice;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [query, category, sort, maxPrice]);

  const hasFilters = category !== "All" || maxPrice < 800 || query !== "";

  const clearAll = () => { setQuery(""); setCategory("All"); setMaxPrice(800); };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Page header ── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-500">
              <HiOutlineShoppingCart className="h-3.5 w-3.5" />
              {product.length} product
            </span>
            <h1 className="mb-2 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
              All product
            </h1>
            <p className="text-[15px] text-gray-500">
              Premium tech accessories for the modern workspace.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">

          {/* ── Sidebar ── */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">

              {/* Search */}
              <div>
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Search
                </p>
                <div className="relative">
                  <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search product…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Category
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        category === cat
                          ? "bg-brand text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {cat}
                      <span className={`text-[11px] ${category === cat ? "text-gray-300" : "text-gray-400"}`}>
                        {cat === "All" ? product.length : product.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    Max Price
                  </p>
                  <span className="text-[13px] font-semibold text-gray-900">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={800}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gray-900"
                />
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>$40</span>
                  <span>$800</span>
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-[13px] font-medium text-gray-500 transition hover:border-gray-300 hover:text-gray-900"
                >
                  <HiOutlineX className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Main ── */}
          <div className="min-w-0 flex-1">

            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-[13px] text-gray-500">
                  <span className="font-semibold text-gray-900">{filtered.length}</span> results
                </p>
                {category !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-medium text-gray-600">
                    <HiOutlineAdjustments className="h-3 w-3" />
                    {category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile search */}
                <div className="relative lg:hidden">
                  <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-36 rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400"
                  />
                </div>

                <SortDropdown value={sort} onChange={setSort} />

                {/* View toggle */}
                <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  {(["grid", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex h-9 w-9 items-center justify-center transition-colors ${
                        view === v ? "bg-brand text-white" : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      {v === "grid" ? (
                        <HiOutlineViewGrid className="h-4 w-4" />
                      ) : (
                        <HiOutlineViewList className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* product */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={`${view}-${category}-${sort}-${maxPrice}`}
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    view === "grid"
                      ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {filtered.map((product) =>
                    view === "grid" ? (
                      <GridCard key={product.id} product={product} />
                    ) : (
                      <ListCard key={product.id} product={product} />
                    )
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center"
                >
                  <HiOutlineShoppingCart className="mb-3 h-10 w-10 text-gray-300" />
                  <p className="text-sm font-semibold text-gray-600">No product found</p>
                  <p className="mt-1 text-[13px] text-gray-400">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-4 rounded-xl border border-gray-200 px-5 py-2 text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
