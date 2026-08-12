"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { HiOutlineLocationMarker } from "react-icons/hi";

const VIEW_W = 520;
const VIEW_H = 460;
const WORLD_W = 1240;
const WORLD_H = 840;
const SPEED = 72;
const DWELL = 1.4;

type Pt = { x: number; y: number };
interface Seg {
  p0: Pt;
  c1: Pt;
  c2: Pt;
  p1: Pt;
}
interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  tall: boolean;
  lit: { x: number; y: number; w: number; h: number }[];
  beacon: boolean;
}

const WAYPOINTS: Pt[] = [
  { x: 170, y: 720 },
  { x: 330, y: 590 },
  { x: 520, y: 520 },
  { x: 710, y: 430 },
  { x: 940, y: 380 },
  { x: 1080, y: 270 },
  { x: 1160, y: 150 },
  { x: 950, y: 130 },
  { x: 760, y: 170 },
  { x: 560, y: 240 },
  { x: 370, y: 320 },
];

const STOP_NAMES = ["New York", "Stamford", "New Haven", "Hartford", "Worcester", "Boston"];
const STOP_WAYS = [0, 2, 4, 6, 8, 10];
const ARRIVALS = ["06:05", "06:50", "08:10", "09:40", "11:30", "12:55"];

function cubicPoint(s: Seg, t: number): Pt {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * s.p0.x + b * s.c1.x + c * s.c2.x + d * s.p1.x,
    y: a * s.p0.y + b * s.c1.y + c * s.c2.y + d * s.p1.y,
  };
}

function segLen(s: Seg, steps = 40): number {
  let prev = s.p0;
  let len = 0;
  for (let i = 1; i <= steps; i++) {
    const p = cubicPoint(s, i / steps);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

function partialLen(s: Seg, t: number, steps = 24): number {
  let prev = s.p0;
  let len = 0;
  for (let i = 1; i <= steps; i++) {
    const p = cubicPoint(s, (t * i) / steps);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

function buildPath(pts: Pt[]) {
  const n = pts.length;
  const segs: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const pp = pts[(i - 1 + n) % n];
    const pn = pts[(i + 2) % n];
    segs.push({
      p0,
      c1: { x: p0.x + (p1.x - pp.x) / 6, y: p0.y + (p1.y - pp.y) / 6 },
      c2: { x: p1.x - (pn.x - p0.x) / 6, y: p1.y - (pn.y - p0.y) / 6 },
      p1,
    });
  }
  const d =
    "M " + pts[0].x + " " + pts[0].y +
    segs
      .map((s) => ` C ${s.c1.x} ${s.c1.y} ${s.c2.x} ${s.c2.y} ${s.p1.x} ${s.p1.y}`)
      .join("");
  const lens = segs.map((s) => segLen(s));
  const cum = [0];
  for (let i = 0; i < lens.length; i++) cum.push(cum[i] + lens[i]);
  return { d, segs, lens, cum, total: cum[lens.length] };
}

const ROUTE = buildPath(WAYPOINTS);

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUILDINGS: Building[] = (() => {
  const rng = mulberry32(2026);
  const out: Building[] = [];
  for (let gy = 70; gy < WORLD_H - 40; gy += 130) {
    for (let gx = 40; gx < WORLD_W - 40; gx += 150) {
      if (rng() < 0.16) continue;
      const tall = rng() > 0.78;
      const lit: { x: number; y: number; w: number; h: number }[] = [];
      if (tall && rng() < 0.5) {
        const count = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < count; i++) {
          lit.push({
            x: 4 + rng() * 26,
            y: 4 + rng() * 12,
            w: 2.6 + rng() * 2,
            h: 1.8 + rng() * 1.6,
          });
        }
      }
      out.push({
        x: gx + (rng() - 0.5) * 60,
        y: gy + (rng() - 0.5) * 44,
        w: 34 + rng() * 44,
        h: 22 + rng() * 26,
        d: tall ? 16 + rng() * 12 : 7 + rng() * 6,
        tall,
        lit,
        beacon: tall && rng() < 0.3,
      });
    }
  }
  return out;
})();

const H_ROADS = [150, 330, 510, 690];
const V_ROADS = [240, 500, 760, 1020];

const STREET_NAMES = [
  { x: 380, y: 148, label: "Broadway" },
  { x: 170, y: 328, label: "5th Avenue" },
  { x: 700, y: 328, label: "Main Street" },
  { x: 1060, y: 508, label: "Washington Ave" },
  { x: 1180, y: 688, label: "Market Street" },
];

const PARKS = [
  { x: 1050, y: 500, w: 140, h: 90 },
  { x: 130, y: 120, w: 120, h: 80 },
  { x: 680, y: 90, w: 90, h: 110 },
  { x: 400, y: 640, w: 110, h: 80 },
];

const WATER = "0,770 240,800 380,720 150,700 0,715";

const POIS: { x: number; y: number; label: string }[] = [
  { x: 1010, y: 620, label: "JFK Airport" },
  { x: 640, y: 90, label: "Downtown" },
  { x: 160, y: 350, label: "Grand Central" },
];

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export default function BusLiveMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const busRef = useRef<SVGGElement>(null);
  const liveRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const trailGlowRef = useRef<SVGPathElement>(null);
  const waterRef = useRef<SVGGElement>(null);
  const etaRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeStop, setActiveStop] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    const world = worldRef.current;
    const bus = busRef.current;
    const live = liveRef.current;
    const trail = trailRef.current;
    const trailGlow = trailGlowRef.current;
    if (!el || !world || !bus || !live || !trail || !trailGlow) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tl: gsap.core.Timeline | null = null;
    let io: IntersectionObserver | null = null;

    const pan = { x: 0, y: 0 };
    const targetPan = { x: 0, y: 0 };

    const applyPan = (bx: number, by: number) => {
      targetPan.x = clamp(VIEW_W / 2 - bx, VIEW_W - WORLD_W, 0);
      targetPan.y = clamp(VIEW_H / 2 - by, VIEW_H - WORLD_H, 0);
      pan.x += (targetPan.x - pan.x) * 0.1;
      pan.y += (targetPan.y - pan.y) * 0.1;
      world.setAttribute(
        "transform",
        `translate(${pan.x.toFixed(2)} ${pan.y.toFixed(2)})`
      );
    };

    const placeBus = (segIndex: number, t: number) => {
      const seg = ROUTE.segs[segIndex];
      const p = cubicPoint(seg, t);
      const ahead = cubicPoint(seg, Math.min(1, t + 0.02));
      const ang = Math.atan2(ahead.y - p.y, ahead.x - p.x);
      const deg = (ang * 180) / Math.PI;
      const at = `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`;
      bus.setAttribute("transform", `${at} rotate(${deg.toFixed(1)})`);
      live.setAttribute("transform", at);

      const progress = (ROUTE.cum[segIndex] + partialLen(seg, t)) / ROUTE.total;
      const offset = String((1 - progress).toFixed(4));
      trail.setAttribute("stroke-dashoffset", offset);
      trailGlow.setAttribute("stroke-dashoffset", offset);

      applyPan(p.x, p.y);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.04, progress).toFixed(4)})`;
      }
    };

    const buildTimeline = () => {
      const t = gsap.timeline({ repeat: -1, paused: true });
      ROUTE.segs.forEach((seg, i) => {
        const to = (i + 1) % ROUTE.segs.length;
        const stopIdx = STOP_WAYS.indexOf(to);
        const toIsStop = stopIdx !== -1;
        const segIndex = i;
        const obj = { p: 0 };
        t.to(obj, {
          p: 1,
          duration: Math.max(0.6, ROUTE.lens[i] / SPEED),
          ease: "power1.inOut",
          onUpdate: () => placeBus(segIndex, obj.p),
          onComplete: () => {
            if (toIsStop) setActiveStop(stopIdx);
          },
        });
        if (toIsStop) t.to({}, { duration: DWELL });
      });
      return t;
    };

    tl = buildTimeline();
    placeBus(0, 0);

    if (!reduced) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) tl?.play();
            else tl?.pause();
          });
        },
        { threshold: 0.1 }
      );
      io.observe(el);

      if (waterRef.current) {
        gsap.to(waterRef.current, {
          opacity: 0.7,
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }

    return () => {
      io?.disconnect();
      tl?.kill();
    };
  }, []);

  const nextStop = STOP_NAMES[(activeStop + 1) % STOP_NAMES.length];
  const nextEta = ARRIVALS[(activeStop + 1) % STOP_NAMES.length];

  return (
    <div
      ref={sectionRef}
      className="gsap-hero-widget relative z-10 overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-2xl shadow-brand/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-brand-light to-white px-5 py-3.5">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-text-dark">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Live bus tracking
        </p>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
          On route
        </span>
      </div>

      <div className="relative aspect-[520/460] w-full overflow-hidden bg-[#F4EEE3]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            transform: "perspective(1500px) rotateX(34deg) scale(1.16)",
            transformOrigin: "50% 42%",
          }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="cw-map-breath h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Live 3D map showing a bus travelling the New York to Boston route"
          >
            <defs>
              <linearGradient id="busRouteGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF8A4C" />
                <stop offset="100%" stopColor="#FF6A1C" />
              </linearGradient>
              <linearGradient id="bldRoofGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBF7F1" />
                <stop offset="100%" stopColor="#F2EBDF" />
              </linearGradient>
              <linearGradient id="busBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF934F" />
                <stop offset="100%" stopColor="#FF6A1C" />
              </linearGradient>
              <linearGradient id="busRoofGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB27A" />
                <stop offset="100%" stopColor="#FF8238" />
              </linearGradient>
              <radialGradient id="busGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FF6A1C" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#FF6A1C" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g ref={worldRef} style={{ willChange: "transform" }}>
              <rect x="0" y="0" width={WORLD_W} height={WORLD_H} fill="#F4EEE3" />

              {PARKS.map((pk, i) => (
                <rect
                  key={i}
                  x={pk.x}
                  y={pk.y}
                  width={pk.w}
                  height={pk.h}
                  rx="18"
                  fill="#E3F0D9"
                  stroke="#D2E3C4"
                />
              ))}

              <g ref={waterRef}>
                <polygon points={WATER} fill="#DCECF5" stroke="#C8E0EE" strokeWidth="1.5" />
                <path
                  d="M 40 752 C 130 738, 200 762, 300 746"
                  fill="none"
                  stroke="#8FBBD8"
                  strokeWidth="2"
                  opacity="0.55"
                />
              </g>

              {BUILDINGS.map((b, i) => (
                <g key={i}>
                  <polygon
                    points={`${b.x},${b.y + b.h} ${b.x + b.w},${b.y + b.h} ${b.x + b.w - b.d},${b.y + b.h - b.d} ${b.x - b.d},${b.y + b.h - b.d}`}
                    fill="#DED3C2"
                  />
                  <polygon
                    points={`${b.x + b.w},${b.y} ${b.x + b.w - b.d},${b.y - b.d} ${b.x + b.w - b.d},${b.y + b.h - b.d} ${b.x + b.w},${b.y + b.h}`}
                    fill="#E7DFD2"
                  />
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx="5"
                    fill="#EFE9E0"
                    stroke="#E1D8C8"
                  />
                  <rect
                    x={b.x - b.d}
                    y={b.y - b.d}
                    width={b.w}
                    height={b.h}
                    rx="5"
                    fill="url(#bldRoofGrad)"
                    stroke="#E9E1D6"
                  />
                  {b.lit.map((win, wi) => (
                    <rect
                      key={wi}
                      x={b.x - b.d + win.x}
                      y={b.y - b.d + win.y}
                      width={win.w}
                      height={win.h}
                      rx="1"
                      fill="#9AA7BC"
                      opacity="0.5"
                    />
                  ))}
                  {b.beacon && (
                    <circle
                      cx={b.x - b.d + 3}
                      cy={b.y - b.d + 3}
                      r="1.7"
                      fill="#FF7A7A"
                      className="cw-beacon"
                    />
                  )}
                </g>
              ))}

              <g stroke="#E3D9C9" strokeWidth="12" strokeLinecap="round">
                {H_ROADS.map((y) => (
                  <line key={`he${y}`} x1="0" y1={y} x2={WORLD_W} y2={y} />
                ))}
                {V_ROADS.map((x) => (
                  <line key={`ve${x}`} x1={x} y1="0" x2={x} y2={WORLD_H} />
                ))}
              </g>
              <g stroke="#F3EDE3" strokeWidth="9" strokeLinecap="round">
                {H_ROADS.map((y) => (
                  <line key={`h${y}`} x1="0" y1={y} x2={WORLD_W} y2={y} />
                ))}
                {V_ROADS.map((x) => (
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2={WORLD_H} />
                ))}
              </g>
              <g stroke="#D9CDBA" strokeWidth="1.6" strokeDasharray="14 16" opacity="0.85">
                {H_ROADS.map((y) => (
                  <line key={`hd${y}`} x1="0" y1={y} x2={WORLD_W} y2={y} />
                ))}
                {V_ROADS.map((x) => (
                  <line key={`vd${x}`} x1={x} y1="0" x2={x} y2={WORLD_H} />
                ))}
              </g>

              {STREET_NAMES.map((s) => (
                <text
                  key={s.label}
                  x={s.x}
                  y={s.y}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="#B3A893"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {s.label}
                </text>
              ))}

              <path
                d={ROUTE.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="17"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={ROUTE.d}
                fill="none"
                stroke="#FF6A1C"
                strokeWidth="14"
                opacity="0.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={ROUTE.d}
                fill="none"
                stroke="#C9BCAC"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.004 0.026"
                pathLength={1}
                className="cw-dash-flow"
              />
              <path
                ref={trailGlowRef}
                d={ROUTE.d}
                fill="none"
                stroke="#FF6A1C"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
              />
              <path
                ref={trailRef}
                d={ROUTE.d}
                fill="none"
                stroke="url(#busRouteGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
              />

              {POIS.map((p) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="7" fill="#FFFFFF" stroke="#D8CDBD" strokeWidth="1.5" />
                  <circle cx={p.x} cy={p.y} r="2.4" fill="#C9BCAC" />
                  <text
                    x={p.x}
                    y={p.y + 20}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#8A8071"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              {STOP_NAMES.map((name, j) => {
                const w = WAYPOINTS[STOP_WAYS[j]];
                const active = j === activeStop;
                const isNext = j === (activeStop + 1) % STOP_NAMES.length;
                return (
                  <g key={name}>
                    {(active || isNext) && (
                      <circle cx={w.x} cy={w.y} r="16" fill="#FF6A1C" opacity="0.14" className="animate-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                    )}
                    <circle
                      cx={w.x}
                      cy={w.y}
                      r="10.5"
                      fill={active ? "#FF6A1C" : isNext ? "#FFF4ED" : "#FFFFFF"}
                      stroke={active ? "#CC5516" : isNext ? "#FF6A1C" : "#D8CDBD"}
                      strokeWidth="1.6"
                    />
                    <rect
                      x={w.x - 4.6}
                      y={w.y - 3.4}
                      width="9.2"
                      height="6.8"
                      rx="2.4"
                      fill={active ? "#FFFFFF" : "#C9BCAC"}
                    />
                    <rect
                      x={w.x - 4.6}
                      y={w.y - 3.4}
                      width="9.2"
                      height="2.2"
                      rx="1.1"
                      fill={active ? "#FF6A1C" : "#FFFFFF"}
                    />
                    <text
                      x={w.x}
                      y={w.y - 20}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={active || isNext ? "700" : "600"}
                      fill={active || isNext ? "#CC5516" : "#8A8071"}
                    >
                      {name}
                    </text>
                  </g>
                );
              })}

              <g ref={liveRef}>
                <circle cx="0" cy="0" r="13" fill="url(#busGlow)" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#FF6A1C" strokeWidth="1.6" className="cw-ping" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#FF6A1C" strokeWidth="1.6" className="cw-ping cw-ping-late" />
              </g>

              <g ref={busRef}>
                <ellipse cx="1" cy="9" rx="22" ry="6" fill="#B5A689" opacity="0.32" />
                <ellipse cx="12" cy="0" rx="13" ry="5" fill="#FFE9C4" opacity="0.25" />
                <polygon points="22,-5 42,-3 42,3 22,5" fill="#FFE9C4" opacity="0.18" />
                <rect x="9" y="-9.9" width="4.4" height="3" rx="1.5" fill="#5C5040" />
                <rect x="9" y="6.9" width="4.4" height="3" rx="1.5" fill="#5C5040" />
                <rect x="-14" y="-10.2" width="4.4" height="3.6" rx="1.7" fill="#5C5040" />
                <rect x="-14" y="6.6" width="4.4" height="3.6" rx="1.7" fill="#5C5040" />
                <rect x="-21" y="-9.5" width="44" height="19" rx="7" fill="#E7DEC9" />
                <rect x="-20" y="-8.5" width="42" height="17" rx="6" fill="url(#busBodyGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <rect x="-19" y="-6.8" width="40" height="13.6" rx="5.5" fill="url(#busRoofGrad)" opacity="0.95" />
                <rect x="-19" y="-6.8" width="40" height="13.6" rx="5.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <rect x="-18.5" y="-1.1" width="39" height="2.2" rx="1.1" fill="#000000" opacity="0.06" />
                <rect x="-17" y="-8.2" width="33" height="1.5" rx="0.75" fill="#263040" opacity="0.8" />
                <rect x="-17" y="6.7" width="33" height="1.5" rx="0.75" fill="#263040" opacity="0.8" />
                <rect x="-18.5" y="-5.2" width="39" height="1" rx="0.5" fill="#FF6A1C" opacity="0.25" />
                <rect x="-18.5" y="4.2" width="39" height="1" rx="0.5" fill="#FF6A1C" opacity="0.25" />
                <rect x="-14" y="-3.6" width="6.5" height="7.2" rx="2.4" fill="#FFFFFF" opacity="0.5" />
                <rect x="-3" y="-3.8" width="8.5" height="7.6" rx="2.6" fill="#FFFFFF" opacity="0.5" />
                <rect x="12.5" y="-4.4" width="2.8" height="3.4" rx="0.8" fill="#FFFDF7" opacity="0.9" />
                <rect x="12.5" y="-4.4" width="2.8" height="1.1" rx="0.8" fill="#263040" opacity="0.9" />
                <rect x="14" y="-7.6" width="5.5" height="8" rx="2.6" fill="#263040" opacity="0.95" />
                <rect x="15.6" y="-6.6" width="1.2" height="6" rx="0.6" fill="#FFFFFF" opacity="0.35" />
                <rect x="18.6" y="-7.2" width="2.6" height="14.4" rx="1.3" fill="#263040" opacity="0.85" />
                <circle cx="20" cy="-4.4" r="1.5" fill="#FFF3D6" />
                <circle cx="20" cy="4.4" r="1.5" fill="#FFF3D6" />
                <rect x="-21.4" y="-5" width="1.8" height="10" rx="0.9" fill="#263040" opacity="0.85" />
                <circle cx="-20.5" cy="-3.8" r="1.2" fill="#FF5A5A" />
                <circle cx="-20.5" cy="3.8" r="1.2" fill="#FF5A5A" />
              </g>
            </g>
          </svg>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#7A6548]/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />

        <div className="absolute inset-x-3 bottom-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/92 px-4 py-3 shadow-xl shadow-brand/10 backdrop-blur-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
              <HiOutlineLocationMarker className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Next stop
                </span>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
                  Arrives <span ref={etaRef}>{nextEta}</span>
                </span>
              </div>
              <p className="mt-0.5 truncate text-[16px] font-bold leading-tight text-text-dark">
                {nextStop}
              </p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-brand/10">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-[#FFB27A]"
                  style={{ transform: "scaleX(0.04)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cw-map-breath {
          animation: cwBreath 8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes cwBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.028); }
        }
        .cw-ping {
          animation: cwPing 1.9s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .cw-ping-late { animation-delay: 0.95s; }
        @keyframes cwPing {
          0% { transform: scale(0.35); opacity: 0.85; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }
        .cw-dash-flow { animation: cwDash 1.2s linear infinite; }
        @keyframes cwDash {
          to { stroke-dashoffset: -0.03; }
        }
        .cw-beacon {
          animation: cwBeacon 2.4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes cwBeacon {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cw-map-breath, .cw-dash-flow, .cw-ping, .cw-beacon { animation: none; }
        }
      `}</style>
    </div>
  );
}
