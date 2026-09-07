"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineDeviceMobile,
  HiOutlineTicket,
  HiOutlineTemplate,
  HiOutlineChartBar,
  HiOutlineCreditCard,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Node {
  icon: IconType;
  title: string;
  sub?: string;
  style: React.CSSProperties;
}

const NODES: Node[] = [
  { icon: HiOutlineDeviceMobile, title: "Mobile App", sub: "Android · iOS", style: { top: "2%", left: "0%" } },
  { icon: HiOutlineTicket, title: "Passenger Ticket", sub: "QR · e-Ticket", style: { top: "2%", right: "0%" } },
  { icon: HiOutlineTemplate, title: "Admin Dashboard", sub: "Routes · Fleet", style: { bottom: "6%", left: "-2%" } },
  { icon: HiOutlineChartBar, title: "Analytics", sub: "Live reports", style: { bottom: "6%", right: "-2%" } },
  { icon: HiOutlineCreditCard, title: "Payments", style: { bottom: "-6%", left: "50%", transform: "translateX(-50%)" } },
];

export default function PlatformHub() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll(".gsap-hub-node");
    const lines = el.querySelectorAll(".gsap-hub-line");
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      lines,
      { opacity: 0, strokeDasharray: 200, strokeDashoffset: 200 },
      { opacity: 1, strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }
    );
    tl.fromTo(
      nodes,
      { opacity: 0, y: 16, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" },
      "-=0.5"
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="gsap-hero-widget relative mx-auto aspect-square w-full max-w-[440px] py-6"
    >
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <line className="gsap-hub-line" x1="200" y1="200" x2="70" y2="70" stroke="#FFB27A" strokeWidth="2" />
        <line className="gsap-hub-line" x1="200" y1="200" x2="330" y2="70" stroke="#FFB27A" strokeWidth="2" />
        <line className="gsap-hub-line" x1="200" y1="200" x2="55" y2="300" stroke="#FFB27A" strokeWidth="2" />
        <line className="gsap-hub-line" x1="200" y1="200" x2="345" y2="300" stroke="#FFB27A" strokeWidth="2" />
        <line className="gsap-hub-line" x1="200" y1="200" x2="200" y2="360" stroke="#FFB27A" strokeWidth="2" />
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-center text-white shadow-2xl shadow-brand/40 sm:h-32 sm:w-32">
        <span className="text-[11px] font-bold uppercase leading-tight tracking-wide">
          Booking
        </span>
        <span className="text-[11px] font-bold uppercase leading-tight tracking-wide">
          Engine
        </span>
      </div>

      {/* Satellite nodes */}
      {NODES.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.title}
            style={n.style}
            className="gsap-hub-node absolute z-10 flex w-[132px] items-center gap-2 rounded-2xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-lg shadow-brand/10 backdrop-blur-xl sm:w-[150px]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-bold uppercase tracking-wide text-text-dark">
                {n.title}
              </span>
              {n.sub && (
                <span className="block truncate text-[10px] text-text-muted">{n.sub}</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
