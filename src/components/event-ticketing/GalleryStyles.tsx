"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineMusicNote,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineOfficeBuilding,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

type GalleryId = "standing" | "rows" | "curved" | "blocks";

interface Arrangement {
  id: GalleryId;
  tab: string;
  icon: IconType;
  title: string;
  desc: string;
  eventTypes: string[];
  meta: { label: string; value: string }[];
}

const ARRANGEMENTS: Arrangement[] = [
  {
    id: "standing",
    tab: "Standing Floor",
    icon: HiOutlineMusicNote,
    title: "No-Seat Standing Zones",
    desc: "Throwing a concert or a DJ party where sitting is not necessary? Sell by zone instead of by seat — a front pit, a general floor and a rear area, each with its own capacity and its own price.",
    eventTypes: ["Concerts", "DJ parties", "Festivals"],
    meta: [
      { label: "Sold by", value: "Zone capacity" },
      { label: "Tiers", value: "Pit · Floor · Rear" },
    ],
  },
  {
    id: "rows",
    tab: "Straight Rows",
    icon: HiOutlineUserGroup,
    title: "Numbered Rows & Aisles",
    desc: "Conferences and seminars need a seat for every name. Lay out straight rows with a centre aisle, number every seat, and let attendees pick exactly where they will sit.",
    eventTypes: ["Conferences", "Seminars", "Workshops"],
    meta: [
      { label: "Sold by", value: "Individual seat" },
      { label: "Layout", value: "Rows + centre aisle" },
    ],
  },
  {
    id: "curved",
    tab: "Curved Tiers",
    icon: HiOutlineSparkles,
    title: "Curved Auditorium Tiers",
    desc: "Theatres and award nights need sightlines. Curve your rows around the stage, split the house into front, middle and rear tiers, and price each tier by how good the view is.",
    eventTypes: ["Theatre", "Award nights", "Recitals"],
    meta: [
      { label: "Sold by", value: "Seat + tier" },
      { label: "Pricing", value: "By sightline" },
    ],
  },
  {
    id: "blocks",
    tab: "Stadium Blocks",
    icon: HiOutlineOfficeBuilding,
    title: "Stands & Block Sections",
    desc: "Big venues sell in blocks. Wrap lettered stands around the ground, hand each block its own gate and price, and keep thousands of attendees moving through the right entrance.",
    eventTypes: ["Stadium shows", "Sports", "Large expos"],
    meta: [
      { label: "Sold by", value: "Block section" },
      { label: "Entry", value: "Gate per block" },
    ],
  },
];

// ── Seat map geometry ────────────────────────────────────────────────────────
const VB_W = 400;
const VB_H = 250;

interface Seat {
  x: number;
  y: number;
  tier: 0 | 1 | 2;
}

function buildRowSeats(): Seat[] {
  const seats: Seat[] = [];
  const cols = 14;
  const rows = 7;
  const gapX = 22;
  const startX = (VB_W - (cols - 1) * gapX) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // centre aisle
      if (c === 6 || c === 7) continue;
      seats.push({
        x: startX + c * gapX,
        y: 88 + r * 22,
        tier: r < 2 ? 0 : r < 5 ? 1 : 2,
      });
    }
  }
  return seats;
}

function buildCurvedSeats(): Seat[] {
  const seats: Seat[] = [];
  const cx = VB_W / 2;
  const cy = 8;
  const radii = [92, 116, 140, 164, 188, 212];
  radii.forEach((r, ri) => {
    const count = 10 + ri * 2;
    const spread = 96; // degrees of arc
    const start = 90 - spread / 2;
    for (let i = 0; i < count; i++) {
      const deg = start + (spread / (count - 1)) * i;
      const rad = (deg * Math.PI) / 180;
      seats.push({
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
        tier: ri < 2 ? 0 : ri < 4 ? 1 : 2,
      });
    }
  });
  return seats;
}

const TIER_FILL = ["#FF6A1C", "#FFB27A", "#4B5563"] as const;

// Geometry depends on nothing but the constants above, so it is computed once.
const ROW_SEATS = buildRowSeats();
const CURVED_SEATS = buildCurvedSeats();

function SeatMap({ id }: { id: GalleryId }) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${id} gallery arrangement preview`}
    >
      {/* Stage / field */}
      {id === "blocks" ? (
        <>
          <rect
            x="118"
            y="80"
            width="164"
            height="92"
            rx="10"
            fill="#0f2a1c"
            stroke="#1f4d34"
            strokeWidth="1.5"
          />
          <line x1="200" y1="80" x2="200" y2="172" stroke="#1f4d34" strokeWidth="1.5" />
          <circle cx="200" cy="126" r="16" fill="none" stroke="#1f4d34" strokeWidth="1.5" />
          <text
            x="200"
            y="196"
            textAnchor="middle"
            className="fill-gray-500 text-[9px] font-semibold uppercase tracking-[0.2em]"
          >
            Ground
          </text>
        </>
      ) : (
        <>
          <rect x="120" y="20" width="160" height="26" rx="8" fill="url(#stageGrad)" />
          <text
            x="200"
            y="37"
            textAnchor="middle"
            className="fill-white text-[10px] font-bold uppercase tracking-[0.22em]"
          >
            Stage
          </text>
          {/* stage glow */}
          <ellipse cx="200" cy="52" rx="120" ry="16" fill="url(#glowGrad)" />
        </>
      )}

      <defs>
        <linearGradient id="stageGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6A1C" />
          <stop offset="100%" stopColor="#cc5516" />
        </linearGradient>
        <radialGradient id="glowGrad">
          <stop offset="0%" stopColor="#FF6A1C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF6A1C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Standing zones ── */}
      {id === "standing" &&
        [
          { y: 72, h: 42, label: "Front Pit · 400", fill: "#FF6A1C", op: 0.85 },
          { y: 122, h: 52, label: "General Floor · 1,200", fill: "#FFB27A", op: 0.75 },
          { y: 182, h: 40, label: "Rear Zone · 600", fill: "#6B7280", op: 0.55 },
        ].map((z) => (
          <g key={z.label}>
            <rect
              x="50"
              y={z.y}
              width="300"
              height={z.h}
              rx="10"
              fill={z.fill}
              fillOpacity={z.op * 0.28}
              stroke={z.fill}
              strokeOpacity={z.op}
              strokeWidth="1.5"
            />
            <text
              x="200"
              y={z.y + z.h / 2 + 4}
              textAnchor="middle"
              className="fill-white text-[11px] font-semibold"
            >
              {z.label}
            </text>
          </g>
        ))}

      {/* ── Straight rows ── */}
      {id === "rows" &&
        ROW_SEATS.map((s, i) => (
          <rect
            key={i}
            x={s.x - 6}
            y={s.y - 6}
            width="12"
            height="12"
            rx="3"
            fill={TIER_FILL[s.tier]}
            fillOpacity={s.tier === 2 ? 0.7 : 1}
          />
        ))}

      {/* ── Curved tiers ── */}
      {id === "curved" &&
        CURVED_SEATS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r="5"
            fill={TIER_FILL[s.tier]}
            fillOpacity={s.tier === 2 ? 0.7 : 1}
          />
        ))}

      {/* ── Stadium blocks ── */}
      {id === "blocks" &&
        [
          { x: 118, y: 34, w: 164, h: 34, label: "Block A", tier: 0 },
          { x: 118, y: 184, w: 164, h: 34, label: "Block C", tier: 1 },
          { x: 40, y: 62, w: 64, h: 128, label: "Block D", tier: 2 },
          { x: 296, y: 62, w: 64, h: 128, label: "Block B", tier: 1 },
        ].map((b) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="8"
              fill={TIER_FILL[b.tier as 0 | 1 | 2]}
              fillOpacity="0.3"
              stroke={TIER_FILL[b.tier as 0 | 1 | 2]}
              strokeWidth="1.5"
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 4}
              textAnchor="middle"
              className="fill-white text-[10.5px] font-semibold"
            >
              {b.label}
            </text>
          </g>
        ))}
    </svg>
  );
}

const LEGEND = [
  { color: "#FF6A1C", label: "Premium" },
  { color: "#FFB27A", label: "Standard" },
  { color: "#6B7280", label: "Economy" },
];

export default function GalleryStyles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<GalleryId>("standing");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  const arrangement = ARRANGEMENTS.find((a) => a.id === active)!;

  return (
    <section
      ref={sectionRef}
      id="gallery-styles"
      className="relative overflow-hidden bg-[#0b0b10] py-16 text-gray-100 lg:py-24"
    >
      {/* ambient stage light */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <p
            data-gsap
            className="text-[13px] font-semibold uppercase tracking-widest text-brand"
          >
            Pick Any Gallery Style
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-white sm:text-[28px] sm:leading-snug"
          >
            Catered to Fit Any Type of Gallery Arrangement
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-gray-400 sm:text-[14px]"
          >
            We customize the event ticketing system for any gallery arrangement —
            a concert or DJ party where sitting is not necessary, or a conference
            and seminar where seating matters. Tap a style to preview it.
          </p>
        </div>

        <div
          data-gsap
          className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12"
        >
          {/* ── Style selector ── */}
          <div
            role="tablist"
            aria-label="Gallery arrangement styles"
            className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {ARRANGEMENTS.map((a) => {
              const Icon = a.icon;
              const isActive = a.id === active;
              return (
                <button
                  key={a.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActive(a.id)}
                  className={`group flex min-w-[190px] shrink-0 items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 lg:min-w-0 lg:w-full ${
                    isActive
                      ? "border-brand/50 bg-brand/12 shadow-lg shadow-brand/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-white/8 text-gray-400 group-hover:text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-[13.5px] font-semibold ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {a.tab}
                    </span>
                    <span className="block truncate text-[11px] text-gray-500">
                      {a.eventTypes[0]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Preview panel ── */}
          <div
            key={active}
            role="tabpanel"
            className="animate-panel-in overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
          >
            <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
              {/* map */}
              <div className="border-b border-white/10 p-5 sm:p-7 xl:border-b-0 xl:border-r">
                <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-white/5 sm:p-5">
                  <SeatMap id={active} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {LEGEND.map((l) => (
                    <span
                      key={l.label}
                      className="flex items-center gap-2 text-[11.5px] text-gray-400"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: l.color }}
                      />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* details */}
              <div className="flex flex-col p-5 sm:p-7">
                <h3 className="text-[17px] font-semibold tracking-tight text-white sm:text-[19px]">
                  {arrangement.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-gray-400">
                  {arrangement.desc}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {arrangement.meta.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-[13px] font-semibold text-white">{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-500">
                    Best for
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {arrangement.eventTypes.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11.5px] font-medium text-brand"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group mt-auto inline-flex items-center gap-2 pt-8 text-[13px] font-semibold text-brand transition-colors hover:text-white"
                >
                  Request this arrangement
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
