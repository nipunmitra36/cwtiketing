"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineArrowNarrowRight,
  HiOutlineUsers,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineDeviceMobile,
  HiOutlineTicket,
  HiOutlinePlay,
  HiOutlineChartBar,
} from "react-icons/hi";

// ── Connectors (animated network lines) ──────────────────────────────────────
function ConnectorV() {
  return (
    <div className="relative z-0 mx-auto h-8 w-8">
      <span className="gsap-line-v absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/70 via-brand/40 to-brand/20 shadow-[0_0_8px_rgba(255,106,28,0.45)]" />
      <span className="gsap-dot-v absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand opacity-0 shadow-[0_0_10px_rgba(255,106,28,0.9)]" />
    </div>
  );
}

function ConnectorH() {
  return (
    <div className="relative z-0 flex w-8 items-center">
      <span className="gsap-line-h h-[2px] w-full rounded-full bg-gradient-to-r from-brand/50 via-brand/70 to-brand/50 shadow-[0_0_8px_rgba(255,106,28,0.45)]" />
      <span className="gsap-dot-h absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand opacity-0 shadow-[0_0_10px_rgba(255,106,28,0.9)]" />
    </div>
  );
}

// ── Admin Dashboard card (glass) ─────────────────────────────────────────────
function AdminDashboardCard() {
  return (
    <div className="gsap-bento-card relative z-10 flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-gray-100/70 px-4 py-2.5">
        <p className="text-[12px] font-medium text-text-dark">Admin Dashboard</p>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-text-muted">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        {[
          { icon: <HiOutlineUsers className="h-3 w-3" />, value: "1,247", label: "Bookings" },
          { icon: <HiOutlineCreditCard className="h-3 w-3" />, value: "$84K", label: "Revenue" },
          { icon: <HiOutlineShieldCheck className="h-3 w-3" />, value: "92%", label: "Occupancy" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white/60 p-2 text-center backdrop-blur-sm">
            <span className="mb-1 flex justify-center text-brand">{s.icon}</span>
            <p className="text-[13px] font-medium leading-tight text-text-dark">{s.value}</p>
            <p className="text-[9px] text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-24 truncate text-[10px] text-text-body">NYC–Boston</span>
          <div className="flex-1 overflow-hidden rounded-full bg-gray-100/80">
            <div
              className="gsap-bar h-1.5 w-0 rounded-full bg-gradient-to-r from-brand to-brand-hover"
              data-width="82%"
            />
          </div>
          <span className="text-[10px] font-semibold text-text-dark">82%</span>
        </div>
      </div>
    </div>
  );
}

// ── Mobile App card (glass) ───────────────────────────────────────────────────
function MobileAppCard() {
  return (
    <div className="gsap-bento-card flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-3 py-5 text-center shadow-xl shadow-black/20 backdrop-blur-2xl">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
        <HiOutlineDeviceMobile className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[12px] font-medium text-text-dark">Mobile App</p>
        <p className="text-[9px] text-text-muted">Android &amp; iOS</p>
      </div>
      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-semibold text-brand">
        Download
      </span>
    </div>
  );
}

// ── Booking Engine card (central, highlighted) ───────────────────────────────
function BookingEngineCard() {
  return (
    <div className="gsap-bento-card relative z-10 flex flex-[1.3] flex-col overflow-hidden rounded-2xl border border-brand/40 bg-white shadow-2xl shadow-brand/20 backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-brand/10 bg-brand-light px-3 py-2">
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          Booking Engine
        </p>
        <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-semibold text-white">
          Core
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-3">
        <div className="flex items-center justify-between gap-1 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5">
          <div>
            <p className="text-[9px] text-text-muted">Search</p>
            <p className="text-[10px] font-medium text-text-dark">NYC → Boston</p>
          </div>
          <HiOutlineArrowNarrowRight className="h-3.5 w-3.5 shrink-0 text-brand" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          {["Seats", "Pay", "Issue"].map((step, i) => (
            <div
              key={step}
              className={`rounded-lg py-1 ${
                i === 1 ? "bg-brand text-white" : "bg-gray-50 text-text-body"
              }`}
            >
              <p className="text-[10px] font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Passenger Ticket card (glass) ────────────────────────────────────────────
function PassengerTicketCard() {
  const bars = [2, 3, 1, 4, 2, 3, 1, 2, 4, 2, 3, 2];
  return (
    <div className="gsap-bento-card flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-3 py-5 text-center shadow-xl shadow-black/20 backdrop-blur-2xl">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
        <HiOutlineTicket className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[12px] font-medium text-text-dark">Passenger Ticket</p>
        <p className="text-[9px] text-text-muted">NYC → Boston • Seat A12</p>
      </div>
      <div className="flex h-3 items-stretch gap-[2px]">
        {bars.map((w, i) => (
          <span key={i} className="bg-gray-800" style={{ width: `${w}px` }} />
        ))}
      </div>
    </div>
  );
}

// ── Analytics card (glass) ───────────────────────────────────────────────────
function AnalyticsCard() {
  const heights = [18, 28, 22, 34, 30, 42];
  return (
    <div className="gsap-bento-card relative z-10 flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/80 px-4 py-3.5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <HiOutlineChartBar className="h-3.5 w-3.5 text-brand" />
          <p className="text-[12px] font-medium text-text-dark">Analytics</p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600">Revenue +18%</span>
      </div>
      <div className="mt-2.5 flex items-end gap-1.5">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/30 to-brand"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
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

      // ── Scene cards: fade + scale in, staggered ──
      const cards = bentoRef.current?.querySelectorAll(".gsap-bento-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 30, scale: 0.96 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.5,
          ease: "power2.out",
        });
      }

      // ── Connector lines draw in ──
      const vLines = bentoRef.current?.querySelectorAll(".gsap-line-v");
      if (vLines?.length) {
        gsap.fromTo(
          vLines,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.45,
            stagger: 0.2,
            delay: 1.1,
            ease: "power2.inOut",
            transformOrigin: "50% 0%",
          }
        );
      }
      const hLines = bentoRef.current?.querySelectorAll(".gsap-line-h");
      if (hLines?.length) {
        gsap.fromTo(
          hLines,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.4,
            stagger: 0.15,
            delay: 1.1,
            ease: "power2.inOut",
            transformOrigin: "0% 50%",
          }
        );
      }

      // ── Traveling pulse signals along the connectors ──
      const dotsV = bentoRef.current?.querySelectorAll(".gsap-dot-v");
      dotsV?.forEach((d, i) => {
        gsap.fromTo(
          d,
          { top: 0, opacity: 1 },
          {
            top: "100%",
            opacity: 0.1,
            duration: 1.1,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 0.5,
            delay: 1.5 + i * 0.2,
            immediateRender: false,
          }
        );
      });
      const dotsH = bentoRef.current?.querySelectorAll(".gsap-dot-h");
      dotsH?.forEach((d, i) => {
        gsap.fromTo(
          d,
          { left: 0, opacity: 1 },
          {
            left: "100%",
            opacity: 0.1,
            duration: 0.9,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 0.4,
            delay: 1.6 + i * 0.2,
            immediateRender: false,
          }
        );
      });

      // ── Scene: parallax drift ──
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

      // ── Scene: gentle idle 3D tilt for depth ──
      const sceneTilt = bentoRef.current?.querySelector(".scene-tilt");
      if (sceneTilt) {
        gsap.fromTo(
          sceneTilt,
          { rotateX: 3, rotateY: -6, transformOrigin: "50% 20%" },
          {
            rotateX: -1,
            rotateY: 4,
            duration: 12,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // ── Animated bar inside admin card ──
      const bars = bentoRef.current?.querySelectorAll(".gsap-bar");
      if (bars?.length) {
        gsap.to(bars, {
          width: (i, el) => el.getAttribute("data-width"),
          duration: 1,
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
            {/* Headline */}
            <h1 className="gsap-left-item mb-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[2.75rem] xl:text-[52px]">
              Launch Your Own{" "}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-brand-light bg-clip-text text-transparent">
                Online Ticket Booking
              </span>{" "}
              System in Weeks
            </h1>

            {/* Sub-copy */}
            <p className="gsap-left-item mb-8 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
              A complete white-label booking system for transport operators. Manage routes,
              seats, payments, passengers, and mobile apps from one powerful platform.
            </p>

            {/* CTA row */}
            <div className="gsap-left-item mb-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Start Free Consultation
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/features"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.97]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-brand">
                  <HiOutlinePlay className="ml-px h-3 w-3 text-white" />
                </span>
                Watch Platform Demo
              </Link>
            </div>

            {/* Trust points */}
            <div className="gsap-left-item flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-white/15 pt-6">
              {[
                "50+ Transport Companies",
                "99.9% Platform Uptime",
                "Android & iOS Apps Included",
              ].map((point) => (
                <span key={point} className="flex items-center gap-2 text-[12px] text-white/80">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand/90">
                    <HiOutlineCheck className="h-2.5 w-2.5 text-white" />
                  </span>
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: connected product ecosystem scene ── */}
          <div ref={bentoRef} className="relative hidden overflow-visible lg:block">
            <div className="mx-auto w-full max-w-[540px] [perspective:1400px]">
              {/* Ambient brand glow behind the scene */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />

              <div className="scene-tilt relative">
                {/* Admin Dashboard */}
                <div className="animate-hero-float">
                  <div className="relative z-10 mx-auto w-full max-w-[400px]">
                    <AdminDashboardCard />
                  </div>
                </div>

                <ConnectorV />

                {/* Middle row: Mobile App — Booking Engine — Passenger Ticket */}
                <div className="flex items-stretch gap-1.5">
                  <MobileAppCard />
                  <ConnectorH />
                  <BookingEngineCard />
                  <ConnectorH />
                  <PassengerTicketCard />
                </div>

                <ConnectorV />

                {/* Analytics */}
                <div className="animate-hero-float-slow">
                  <div className="relative z-10 mx-auto w-full max-w-[420px]">
                    <AnalyticsCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
