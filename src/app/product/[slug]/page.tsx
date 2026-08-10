"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineStar,
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineCheck,
  HiOutlineChevronLeft,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineChevronDown,
  HiOutlineFire,
  HiOutlineTag,
  HiOutlinePlus,
  HiOutlineMinus,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

// ── Mock Product ──────────────────────────────────────────────────────────────
const PRODUCT = {
  id: 1,
  name: "Stellar Pro Wireless Headphones",
  category: "Audio",
  price: 249,
  originalPrice: 329,
  rating: 4.8,
  reviews: 1240,
  badge: "Sale" as const,
  color: "from-slate-700 to-slate-900",
  description:
    "40-hour battery, active noise cancellation, premium drivers.",
  longDescription:
    "The Stellar Pro redefines personal audio with its next-generation active noise cancellation, 40mm custom-tuned drivers, and a battery life that outlasts the longest of flights. Crafted from aerospace-grade aluminium and premium memory foam, it feels as good as it sounds. Whether you're deep in focus mode or commuting across the city, the Stellar Pro keeps you in your world.",
  tags: ["wireless", "noise-cancelling", "premium"],
  specs: [
    { label: "Driver Size", value: "40mm custom-tuned" },
    { label: "Frequency Response", value: "20Hz – 20kHz" },
    { label: "Battery Life", value: "40 hours (ANC on)" },
    { label: "Charging", value: "USB-C, 10 min = 3 hrs" },
    { label: "Connectivity", value: "Bluetooth 5.3, multipoint" },
    { label: "Weight", value: "254g" },
    { label: "Noise Cancellation", value: "Hybrid ANC (-35dB)" },
    { label: "Microphones", value: "6-mic array" },
  ],
  colors: [
    { name: "Midnight", gradient: "from-slate-700 to-slate-900" },
    { name: "Cloud", gradient: "from-gray-200 to-gray-400" },
    { name: "Sage", gradient: "from-teal-500 to-teal-800" },
    { name: "Blush", gradient: "from-rose-400 to-rose-700" },
  ],
  images: [
    { label: "Front", letter: "S" },
    { label: "Side", letter: "◈" },
    { label: "Detail", letter: "⬡" },
    { label: "Folded", letter: "⊠" },
  ],
};

const RELATED = [
  {
    id: 9,
    name: "Echo Wireless Earbuds",
    category: "Audio",
    price: 149,
    rating: 4.6,
    badge: "Limited" as const,
    color: "from-indigo-600 to-indigo-900",
  },
  {
    id: 7,
    name: "Phantom Webcam 4K",
    category: "Audio",
    price: 219,
    originalPrice: 279,
    rating: 4.7,
    badge: "Sale" as const,
    color: "from-red-700 to-red-950",
  },
  {
    id: 5,
    name: "Lumex LED Desk Lamp",
    category: "Lighting",
    price: 129,
    rating: 4.5,
    color: "from-amber-600 to-amber-900",
  },
];

const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Marcus T.",
    avatar: "M",
    rating: 5,
    date: "Apr 28, 2025",
    title: "Best headphones I've ever owned",
    body: "The ANC is absolutely incredible — I couldn't hear anything on a 10-hour flight. Build quality feels premium and the ear cups are supremely comfortable for long sessions.",
    verified: true,
  },
  {
    id: 2,
    author: "Priya K.",
    avatar: "P",
    rating: 5,
    date: "Mar 15, 2025",
    title: "Worth every penny",
    body: "Sound staging is exceptional. Bass is tight without being overbearing, mids are crystal clear. Battery life is as advertised — I charged it once this week.",
    verified: true,
  },
  {
    id: 3,
    author: "Jonas B.",
    avatar: "J",
    rating: 4,
    date: "Feb 3, 2025",
    title: "Almost perfect",
    body: "Exceptional audio quality and build. Minor complaint: the touch controls have a small learning curve. Everything else is flawless.",
    verified: false,
  },
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-4.5 w-4.5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <HiOutlineStar
          key={i}
          className={`${cls} ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── Rating Bar ────────────────────────────────────────────────────────────────
function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <span className="w-4 shrink-0 text-right text-gray-500">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-1.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="h-full rounded-full bg-amber-400"
        />
      </div>
      <span className="w-8 text-gray-400">{pct}%</span>
    </div>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between py-4 text-[14px] font-semibold text-gray-900"
      >
        {title}
        <HiOutlineChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SingleProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = PRODUCT.originalPrice
    ? Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const activeColor = PRODUCT.colors[selectedColor];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-3 pt-24 sm:px-6 lg:pt-28 lg:px-8">
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            <Link href="/" className="transition hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="transition hover:text-gray-700">Products</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{PRODUCT.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ── Back ── */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 transition hover:text-gray-900"
        >
          <HiOutlineChevronLeft className="h-4 w-4" />
          Back to products
        </Link>

        {/* ── Main grid ── */}
        <div className="grid gap-12 lg:grid-cols-2">

          {/* ── Left: Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } }}
          >
            {/* Main image */}
            <div
              className={`relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${activeColor.gradient} shadow-lg`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${selectedImage}-${selectedColor}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } }}
                  exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.2 } }}
                  className="select-none text-[160px] font-black text-white/10 leading-none"
                >
                  {PRODUCT.images[selectedImage].letter}
                </motion.span>
              </AnimatePresence>

              {/* Badge */}
              {PRODUCT.badge && (
                <span
                  className={`absolute left-4 top-4 flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${BADGE_STYLES[PRODUCT.badge]}`}
                >
                  {BADGE_ICONS[PRODUCT.badge]}
                  {PRODUCT.badge}
                </span>
              )}
              {discount && (
                <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-2.5 py-1 text-[12px] font-medium text-white">
                  -{discount}%
                </span>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setWished((p) => !p)}
                className={`absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-95 ${
                  wished
                    ? "border-rose-200 bg-white text-rose-500"
                    : "border-white/30 bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                <HiOutlineHeart className={`h-5 w-5 ${wished ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex h-20 items-center justify-center overflow-hidden rounded-xl border-2 bg-gradient-to-br ${activeColor.gradient} transition-all ${
                    selectedImage === i
                      ? "border-gray-900 shadow-md"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <span className="select-none text-2xl font-black text-white/20">{img.letter}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: 0.1 } }}
            className="flex flex-col"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              {PRODUCT.category}
            </p>
            <h1 className="mb-3 text-3xl font-medium tracking-tight text-gray-900 leading-tight">
              {PRODUCT.name}
            </h1>

            {/* Rating row */}
            <div className="mb-5 flex items-center gap-3">
              <Stars rating={PRODUCT.rating} />
              <span className="text-[13px] font-semibold text-gray-900">{PRODUCT.rating}</span>
              <span className="text-[13px] text-gray-400">·</span>
              <span className="text-[13px] text-gray-500">
                {PRODUCT.reviews.toLocaleString()} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-4xl font-medium text-gray-900">${PRODUCT.price}</span>
              {PRODUCT.originalPrice && (
                <span className="text-[18px] text-gray-400 line-through">${PRODUCT.originalPrice}</span>
              )}
              {discount && (
                <span className="rounded-full bg-rose-50 px-3 py-1 text-[13px] font-semibold text-rose-600">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="mb-7 text-[14px] leading-relaxed text-gray-500">
              {PRODUCT.longDescription}
            </p>

            {/* Color picker */}
            <div className="mb-6">
              <div className="mb-2.5 flex items-center gap-2">
                <p className="text-[12px] font-semibold text-gray-700">Color</p>
                <span className="text-[12px] text-gray-400">{activeColor.name}</span>
              </div>
              <div className="flex gap-2.5">
                {PRODUCT.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${c.gradient} transition-all ${
                      selectedColor === i
                        ? "ring-2 ring-gray-900 ring-offset-2"
                        : "ring-1 ring-gray-200 hover:ring-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="mb-6 flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 active:scale-95"
                >
                  <HiOutlineMinus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-[14px] font-semibold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 active:scale-95"
                >
                  <HiOutlinePlus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold transition-all active:scale-[0.98] ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-brand text-white hover:bg-brand-hover"
                }`}
              >
                {added ? (
                  <><HiOutlineCheck className="h-4 w-4" /> Added to Cart</>
                ) : (
                  <><HiOutlineShoppingCart className="h-4 w-4" /> Add to Cart — ${(PRODUCT.price * qty).toLocaleString()}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mb-8 grid grid-cols-3 gap-3">
              {[
                { icon: <HiOutlineTruck className="h-4 w-4" />, label: "Free shipping", sub: "Orders over $75" },
                { icon: <HiOutlineRefresh className="h-4 w-4" />, label: "30-day returns", sub: "Hassle-free" },
                { icon: <HiOutlineShieldCheck className="h-4 w-4" />, label: "2-year warranty", sub: "Covered" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-3 text-center">
                  <span className="mb-1 text-gray-500">{b.icon}</span>
                  <p className="text-[12px] font-semibold text-gray-800">{b.label}</p>
                  <p className="text-[11px] text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              <Accordion title="Specifications">
                <dl className="space-y-2">
                  {PRODUCT.specs.map((s) => (
                    <div key={s.label} className="flex justify-between text-[13px]">
                      <dt className="text-gray-500">{s.label}</dt>
                      <dd className="font-medium text-gray-900">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>
              <Accordion title="In the box">
                <ul className="space-y-1.5 text-[13px] text-gray-600">
                  {["Stellar Pro Headphones", "USB-C Charging Cable (1.2m)", "3.5mm Audio Cable (1.2m)", "Carry Case", "Quick Start Guide"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <HiOutlineCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p className="text-[13px] leading-relaxed text-gray-600">
                  Free standard shipping on orders over $75. Express options available at checkout.
                  Returns accepted within 30 days of delivery — items must be unused and in original packaging.
                </p>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* ── Reviews ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.25 } }}
          className="mt-20"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">Customer Reviews</h2>
              <p className="mt-1 text-[14px] text-gray-500">{PRODUCT.reviews.toLocaleString()} verified reviews</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-5xl font-medium text-gray-900">{PRODUCT.rating}</p>
                <Stars rating={PRODUCT.rating} size="md" />
                <p className="mt-1 text-[12px] text-gray-400">out of 5</p>
              </div>
              <div className="space-y-1.5 min-w-[180px]">
                {[
                  { label: "5", pct: 72 },
                  { label: "4", pct: 18 },
                  { label: "3", pct: 6 },
                  { label: "2", pct: 2 },
                  { label: "1", pct: 2 },
                ].map((r) => <RatingBar key={r.label} {...r} />)}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: 0.1 * i } }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold text-gray-900">{r.author}</p>
                        {r.verified && (
                          <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                            <HiOutlineCheck className="h-3 w-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">{r.date}</p>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="mb-1 text-[14px] font-semibold text-gray-900">{r.title}</p>
                <p className="text-[13px] leading-relaxed text-gray-500">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Related Products ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.35 } }}
          className="mt-20"
        >
          <h2 className="mb-6 text-2xl font-medium text-gray-900">You Might Also Like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((p) => {
              const relDiscount = p.originalPrice
                ? Math.round((1 - p.price / p.originalPrice) * 100)
                : null;
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${p.color}`}
                  >
                    <span className="select-none text-7xl font-black text-white/10 transition-transform duration-500 group-hover:scale-110">
                      {p.name[0]}
                    </span>
                    {p.badge && (
                      <span className={`absolute left-3 top-3 flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${BADGE_STYLES[p.badge]}`}>
                        {BADGE_ICONS[p.badge]}
                        {p.badge}
                      </span>
                    )}
                    {relDiscount && (
                      <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-medium text-white">
                        -{relDiscount}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{p.category}</p>
                    <h3 className="mb-2 text-[14px] font-medium text-gray-900 group-hover:text-gray-700 line-clamp-1">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Stars rating={p.rating} />
                        <span className="text-[11px] text-gray-400">{p.rating}</span>
                      </div>
                      <div>
                        <span className="text-[16px] font-medium text-gray-900">${p.price}</span>
                        {"originalPrice" in p && p.originalPrice && (
                          <span className="ml-1.5 text-[12px] text-gray-400 line-through">${p.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.section>
      </div>
    </main>
  );
}