"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineArrowNarrowRight,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineCreditCard,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlineShieldCheck,
} from "react-icons/hi";

// ── Seat Selection Card (glass) ───────────────────────────────────────────────
function SeatSelectionCard() {
  const rows = [
    [0, 1, 0, 2, 1, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 2, 1, 0, 0, 2],
    [1, 0, 0, 2, 1, 0],
  ];
  const seatColors = ["bg-gray-200", "bg-brand", "bg-emerald-400"];
  const seatLabels = ["Available", "Selected", "Booked"];

  return (
    <div className="gsap-bento-card col-span-5 row-span-3 overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="border-b border-gray-100/70 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-text-dark">NYC → Boston</p>
            <p className="text-[10px] text-text-muted">AC Sleeper • Seat Layout</p>
          </div>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
            Bus
          </span>
        </div>
      </div>
      <div className="px-4 pt-4 pb-3">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="text-[9px] text-text-muted">Driver</span>
        </div>
        <div className="space-y-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex items-center gap-1.5">
              <span className="w-4 text-center text-[9px] font-medium text-text-muted">
                {ri + 1}
              </span>
              {row.map((seat, si) => (
                <div key={si} className="flex flex-1 items-center gap-0.5">
                  <div className={`h-5 w-5 rounded-[4px] transition-colors ${seatColors[seat]}`} />
                  {(si === 1 || si === 3) && <div className="h-5 w-2" />}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-gray-100/70 pt-2.5">
          {seatColors.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className={`h-2.5 w-2.5 rounded-sm ${c}`} />
              <span className="text-[9px] text-text-muted">{seatLabels[i]}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard Card (glass) ──────────────────────────────────────────────
function AdminDashboardCard() {
  const bookings = [
    { route: "NYC–Boston", count: 234, pct: 82 },
    { route: "LA–SF", count: 189, pct: 67 },
    { route: "Chicago–Dallas", count: 156, pct: 55 },
  ];

  return (
    <div className="gsap-bento-card col-span-7 row-span-3 overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="border-b border-gray-100/70 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold text-text-dark">Admin Dashboard</p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-text-muted">Live</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { icon: <HiOutlineUsers className="h-3 w-3" />, value: "1,247", label: "Today" },
            { icon: <HiOutlineCreditCard className="h-3 w-3" />, value: "$84K", label: "Revenue" },
            { icon: <HiOutlineClock className="h-3 w-3" />, value: "98.2%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/60 p-2 text-center backdrop-blur-sm">
              <span className="mb-1 flex justify-center text-brand">{s.icon}</span>
              <p className="text-[13px] font-bold text-text-dark leading-tight">{s.value}</p>
              <p className="text-[9px] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <p className="mb-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            Top Routes
          </p>
          <div className="space-y-1.5">
            {bookings.map((b) => (
              <div key={b.route} className="flex items-center gap-2">
                <span className="w-20 truncate text-[10px] text-text-body">{b.route}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-100/80">
                  <div
                    className="gsap-bar h-1.5 w-0 rounded-full bg-gradient-to-r from-brand to-brand-hover"
                    data-width={`${b.pct}%`}
                  />
                </div>
                <span className="w-6 text-right text-[10px] font-semibold text-text-dark">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand/5 px-3 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
          <p className="text-[10px] text-text-body">
            <span className="font-semibold">John D.</span> booked NYC→Boston for{" "}
            <span className="font-semibold text-brand">$65</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Booking App Card (glass) ───────────────────────────────────────────
function MobileBookingCard() {
  return (
    <div className="gsap-bento-card col-span-5 row-span-4 overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="relative mx-auto mt-3 w-[calc(100%-24px)] rounded-[20px] border-[3px] border-gray-900 bg-white pt-6">
        <div className="absolute left-1/2 top-1.5 h-2 w-12 -translate-x-1/2 rounded-full bg-gray-900" />
        <div className="flex items-center justify-between px-4 pb-2 pt-1">
          <span className="text-[9px] font-semibold text-text-dark">9:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] text-text-muted">●●●●</span>
            <span className="text-[9px] text-text-muted">100%</span>
          </div>
        </div>
        <div className="border-b border-gray-100 px-3 pb-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-dark">Book Ticket</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-brand">
              <HiOutlineLocationMarker className="h-3 w-3" />
            </span>
          </div>
        </div>
        <div className="px-3 pt-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[9px] text-text-muted">From</p>
                <p className="text-[11px] font-bold text-text-dark">New York</p>
                <p className="text-[8px] text-text-muted">07:00 AM</p>
              </div>
              <div className="flex flex-col items-center">
                <HiOutlineArrowNarrowRight className="h-4 w-4 text-brand" />
                <span className="text-[8px] text-text-muted">6h 30m</span>
              </div>
              <div className="flex-1 text-right">
                <p className="text-[9px] text-text-muted">To</p>
                <p className="text-[11px] font-bold text-text-dark">Boston</p>
                <p className="text-[8px] text-text-muted">01:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 px-3 pt-3">
          {[
            { name: "Greyhound", type: "AC Sleeper", price: "$65", time: "07:00" },
            { name: "Megabus", type: "Non-AC", price: "$45", time: "07:30" },
          ].map((bus, i) => (
            <div
              key={bus.name}
              className={`rounded-xl border p-2.5 ${i === 0 ? "border-brand/30 bg-brand-light" : "border-gray-100 bg-white"
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-text-dark">{bus.name}</p>
                  <p className="text-[8px] text-text-muted">{bus.type} • {bus.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-brand">{bus.price}</p>
                  <button className="mt-0.5 rounded-md bg-brand px-2 py-0.5 text-[8px] font-semibold text-white">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-around border-t border-gray-100 px-3 py-2">
          {["Search", "My Trips", "Profile"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[8px] font-medium ${i === 0 ? "text-brand" : "text-text-muted"}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Payment Confirmation Card (glass) ─────────────────────────────────────────
function PaymentConfirmationCard() {
  return (
    <div className="gsap-bento-card col-span-7 row-span-4 overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex items-center gap-3 bg-emerald-500 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <HiOutlineCheck className="h-4 w-4 text-emerald-500" />
        </span>
        <div>
          <p className="text-[12px] font-bold text-white">Payment Successful!</p>
          <p className="text-[10px] text-emerald-100">Booking confirmed • Ticket #BK-48291</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-text-dark">New York → Boston</p>
            <p className="text-[10px] text-text-muted">23 Jun 2026 • Greyhound AC</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-brand">$65</p>
            <p className="text-[9px] text-text-muted">2 seats</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-gray-100/70 pt-3">
          {[
            { label: "Departure", value: "07:00 AM" },
            { label: "Seat", value: "A3, A4" },
            { label: "Status", value: "Confirmed" },
          ].map((d) => (
            <div key={d.label}>
              <p className="text-[9px] text-text-muted">{d.label}</p>
              <p className="text-[11px] font-semibold text-text-dark">{d.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-gray-100/70 pt-2.5">
          {[
            { icon: <HiOutlineShieldCheck className="h-3 w-3" />, label: "Secure" },
            { icon: <HiOutlineCreditCard className="h-3 w-3" />, label: "Visa/PayPal" },
            { icon: <HiOutlineStar className="h-3 w-3" />, label: "4.9 Rating" },
          ].map((b) => (
            <span key={b.label} className="flex items-center gap-1 text-[9px] text-text-muted">
              <span className="text-brand">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Left copy: staggered fade-up on scroll ──
      const copyElements = leftCopyRef.current?.querySelectorAll(".gsap-left-item");
      if (copyElements?.length) {
        gsap.fromTo(
          copyElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      // ── Bento grid: step-by-step story sequence ──
      const cards = bentoRef.current?.querySelectorAll(".gsap-bento-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

        const tl = gsap.timeline({ delay: 0.5 });

        // Step 1: Admin Dashboard + Seat Selection (operator setup)
        tl.to(cards[0], { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" })
          .to(cards[1], { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }, 0)
          // Step 2: Mobile Booking (customer books)
          .to(cards[2], { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }, 1.2)
          // Step 3: Payment Confirmation (successfully booked)
          .to(cards[3], { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 2.4);
      }

      // ── Bento grid: parallax drift ──
      if (bentoRef.current) {
        gsap.to(bentoRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // ── Animated bars inside dashboard card ──
      const bars = bentoRef.current?.querySelectorAll(".gsap-bar");
      if (bars?.length) {
        gsap.to(bars, {
          width: (i, el) => el.getAttribute("data-width"),
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 1.5,
        });
      }

      // ── Background video: slow parallax drift for depth ──
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-gray-950">
      {/* ── Full-bleed background video ── */}
      <div className="absolute inset-0 -z-20 h-[calc(100%+80px)] w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.prod.website-files.com/5e4ff204e7b6f80e402d407a%2F69e621412c56967915773ce6_Gorgias_hero_hp_video_V2_mp4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay: subtle darken + brand tint so copy & glass cards stay legible ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-brand/5 mix-blend-multiply" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ── Left: Copy (GSAP fade-up) ── */}
          <div ref={leftCopyRef} className="flex flex-col">
            {/* Eyebrow — glass pill */}
            <div className="gsap-left-item mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1 pl-1 pr-3 text-[12px] font-medium text-white backdrop-blur-md">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                  <HiOutlineCheck className="h-3 w-3 text-white" />
                </span>
                Trusted by 50+ transport companies
              </span>
            </div>

            {/* Headline */}
            <h1 className="gsap-left-item mb-5 text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-[3.4rem]">
              Build Your Own{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Online Ticket</span>
                <span className="absolute bottom-1 left-0 right-0 -z-0 h-3 rounded bg-brand/40" />
              </span>{" "}
              Booking System
            </h1>

            {/* Sub-copy */}
            <p className="gsap-left-item mb-8 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
              Launch a custom web and mobile ticketing system for bus, train, cruise,
              taxi, cable car, or event booking. Manage routes, seats, schedules,
              payments, customers, and reports from one powerful dashboard.
            </p>

            {/* CTA row */}
            <div className="gsap-left-item mb-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Book a Free Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.97]"
              >
                Explore Solutions
                <HiOutlineArrowNarrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="gsap-left-item flex items-center gap-4">
              <div className="flex -space-x-2">
                {["bg-brand", "bg-emerald-500", "bg-sky-500", "bg-violet-500"].map((c, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 text-[10px] font-bold text-white ${c}`}
                  >
                    {["RK", "AS", "MR", "JD"][i]}
                  </span>
                ))}
              </div>
              <div className="text-[12px]">
                <span className="font-semibold text-white">2,400+</span>{" "}
                <span className="text-white/70">operators trust our platform</span>
              </div>
            </div>
          </div>

          {/* ── Right: Bento Grid, glass cards floating over the video ── */}
          <div ref={bentoRef} className="relative overflow-visible hidden lg:block">
            <div className="relative grid grid-cols-12 gap-3">
              <SeatSelectionCard />
              <AdminDashboardCard />
              <MobileBookingCard />
              <PaymentConfirmationCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}