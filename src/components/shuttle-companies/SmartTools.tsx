"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineDocumentReport,
  HiOutlineExclamation,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const tools: { icon: IconType; label: string; desc: string }[] = [
  {
    icon: HiOutlineCalendar,
    label: "Short Route Scheduling",
    desc: "Plan frequent departures and keep local routes running like clockwork.",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Stop-to-Stop Fare Management",
    desc: "Price every hop with zone-based and stop-to-stop fare rules.",
  },
  {
    icon: HiOutlineUsers,
    label: "Real-Time Passenger Load Monitoring",
    desc: "See exact passenger load in real time and balance your fleet accordingly.",
  },
  {
    icon: HiOutlineUserGroup,
    label: "Driver Shift Management",
    desc: "Assign drivers and shifts, and keep every local route fully covered.",
  },
  {
    icon: HiOutlineDocumentReport,
    label: "Smart Reporting Tools",
    desc: "Track sales, loads, and route performance with clear insight.",
  },
  {
    icon: HiOutlineExclamation,
    label: "Route Conflict Alerts",
    desc: "Get flagged instantly when schedules or stops clash across routes.",
  },
];

export default function SmartTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="smart-tools"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Smart Tools for{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Local Bus Operators
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 text-[15px] font-semibold leading-relaxed text-text-dark">
              Local operation. Maximum efficiency.
            </p>
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Take full control of your short-distance routes with a flexible
            ticketing system. Manage schedules, fare zones, and shifts
            effortlessly while boosting passenger convenience and growing your
            ticket sales.
          </p>
        </div>

        {/* ── Numbered tool cards ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => {
            const Icon = t.icon;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <div
                key={t.label}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                {/* ghost number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[88px] font-black leading-none tracking-tighter text-brand/10 transition-colors duration-300 group-hover:text-brand/20">
                  {idx}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-text-muted/60">
                    {idx}
                    <HiOutlineArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </span>
                </div>

                <h3 className="relative mt-5 pr-8 text-[16px] font-medium tracking-tight text-text-dark">
                  {t.label}
                </h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-text-muted">{t.desc}</p>

                {/* bottom route line */}
                <span className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}