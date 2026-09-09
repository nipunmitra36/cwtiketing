"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineArrowRight,
  HiOutlineTicket,
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineMap,
  HiOutlineDeviceMobile,
  HiOutlineSearch,
} from "react-icons/hi";

export default function ShuttleHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const items = copyRef.current?.querySelectorAll(".gsap-hero-item");
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: "power3.out" }
          );
        }

        const card = visualRef.current?.querySelector(".gsap-hero-visual");
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
          );
        }

        gsap.to(visualRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);
    });

    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#FDF7F2] pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-light blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,106,28,0.10) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* ── Left copy ── */}
          <div ref={copyRef} className="max-w-2xl">
            <span className="gsap-hero-item inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
              <HiOutlineTicket className="h-4 w-4" />
              Local &amp; Shuttle Reservation Software
            </span>

            <h1 className="gsap-hero-item mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.6rem] lg:text-[2.75rem] xl:text-[50px]">
              Launch, manage, and grow your own{" "}
              <span className="bg-gradient-to-r from-brand via-brand to-brand-dark bg-clip-text text-transparent">
                branded system
              </span>
            </h1>

            <p className="gsap-hero-item mt-6 text-[15px] font-semibold uppercase tracking-widest text-brand">
              Perfect for City Commute &amp; Local Shuttle Routes
            </p>

            <p className="gsap-hero-item mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-[16px]">
              Run school, office, and local routes&mdash;smarter and faster.
            </p>

            <div className="gsap-hero-item mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Start Free Consultation
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#smart-tools"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-[14px] font-semibold text-text-dark shadow-sm transition-all hover:border-brand/30 hover:text-brand active:scale-[0.97]"
              >
                Explore Features
              </Link>
            </div>

            <div className="gsap-hero-item mt-10 flex flex-col gap-2.5 border-t border-gray-200/80 pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
              {["School routes", "Office shuttles", "City commutes"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-[13.5px] font-medium text-text-body">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineCheckCircle className="h-4 w-4" />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: transit map visual ── */}
          <div ref={visualRef} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="gsap-hero-visual relative">
              {/* Map card */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
                <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="ml-2 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                    Live City Routes
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>

                {/* Route legend */}
                <div className="flex items-center justify-between px-4 pt-4">
                  <div className="flex items-center gap-4">
                    {[
                      { color: "bg-brand", label: "Commute" },
                      { color: "bg-sky-500", label: "School" },
                      { color: "bg-emerald-500", label: "Office" },
                    ].map((r) => (
                      <span key={r.label} className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                        <span className={`h-1 w-4 rounded-full ${r.color}`} />
                        {r.label}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted">
                    <HiOutlineMap className="h-3.5 w-3.5 text-brand" />
                    9 routes
                  </span>
                </div>

                {/* Minimal transit map */}
                <svg viewBox="0 0 480 320" className="mt-3 w-full px-2 pb-2" role="img" aria-label="Transit map showing integrated bus and shuttle routes across a city">
                  {/* faint blocks */}
                  <rect x="18" y="24" width="96" height="64" rx="10" fill="#FDF2E9" />
                  <rect x="366" y="40" width="96" height="58" rx="10" fill="#F1F5F9" />
                  <rect x="320" y="208" width="120" height="70" rx="10" fill="#ECFDF5" />
                  <rect x="20" y="214" width="120" height="66" rx="10" fill="#F8FAFC" />

                  {/* local streets */}
                  <g stroke="#E5E7EB" strokeWidth="2">
                    <line x1="0" y1="120" x2="480" y2="120" strokeDasharray="6 6" />
                    <line x1="120" y1="0" x2="120" y2="320" />
                    <line x1="330" y1="0" x2="330" y2="320" strokeDasharray="6 6" />
                  </g>

                  {/* route paths */}
                  <path
                    d="M60 260 C 140 210, 210 190, 300 150 S 420 110, 460 80"
                    fill="none"
                    stroke="#FF6A1C"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M140 60 C 190 110, 230 130, 300 150"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="4"
                    strokeDasharray="10 7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 120 C 150 150, 250 190, 330 220 S 410 250, 450 250"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeDasharray="2 8"
                    strokeLinecap="round"
                  />

                  {/* stops */}
                  <g>
                    {[
                      { cx: 60, cy: 260 },
                      { cx: 140, cy: 220 },
                      { cx: 220, cy: 195 },
                      { cx: 300, cy: 150 },
                      { cx: 380, cy: 112 },
                    ].map((s, i) => (
                      <g key={i}>
                        <circle cx={s.cx} cy={s.cy} r="9" fill="#fff" stroke="#FF6A1C" strokeWidth="3" />
                        <circle cx={s.cx} cy={s.cy} r="3" fill="#FF6A1C" />
                      </g>
                    ))}
                    {[140, 220].map((_, i) => (
                      <g key={i}>
                        <circle cx={[140, 220][i]} cy={[60, 130][i]} r="9" fill="#fff" stroke="#0EA5E9" strokeWidth="3" />
                        <circle cx={[140, 220][i]} cy={[60, 130][i]} r="3" fill="#0EA5E9" />
                      </g>
                    ))}
                    {[
                      { cx: 190, cy: 168 },
                      { cx: 380, cy: 230 },
                    ].map((s, i) => (
                      <g key={i}>
                        <circle cx={s.cx} cy={s.cy} r="9" fill="#fff" stroke="#10B981" strokeWidth="3" />
                        <circle cx={s.cx} cy={s.cy} r="3" fill="#10B981" />
                      </g>
                    ))}
                  </g>
                </svg>

                {/* Bottom caption */}
                <div className="flex items-center gap-2.5 border-t border-gray-100 bg-gray-50/60 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <HiOutlineLocationMarker className="h-4 w-4" />
                  </span>
                  <p className="text-[12px] font-medium leading-snug text-text-muted">
                    Transit map showing integrated bus and shuttle routes across a city
                  </p>
                </div>
              </div>

              {/* Floating: app search card */}
              <div className="absolute -right-4 -top-6 hidden w-48 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-900/10 sm:block lg:-right-6">
                <div className="flex items-center gap-2 rounded-xl bg-brand-light px-2.5 py-2">
                  <HiOutlineSearch className="h-3.5 w-3.5 text-brand" />
                  <span className="text-[10.5px] font-medium text-brand">Find nearby stops</span>
                </div>
                <div className="mt-2.5 space-y-1.5">
                  {["Central Station", "Maple Street", "City Hospital"].map((s) => (
                    <div key={s} className="flex items-center gap-1.5 text-[10px] font-medium text-text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating: QR ticket card */}
              <div className="absolute -bottom-6 -left-4 hidden w-52 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-xl shadow-gray-900/10 sm:block lg:-left-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <HiOutlineDeviceMobile className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-text-dark">Instant QR Ticket</p>
                    <p className="text-[9.5px] text-text-muted">Route 12 · 08:45 AM</p>
                  </div>
                </div>
                <p className="mt-2.5 text-[10.5px] leading-snug text-text-muted">
                  Travelers using ticketing websites on mobile devices for their journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}