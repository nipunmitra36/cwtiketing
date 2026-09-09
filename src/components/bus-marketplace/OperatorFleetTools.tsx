"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineViewGrid,
  HiOutlineMap,
  HiOutlineTrendingUp,
  HiOutlineFire,
  HiOutlineAdjustments,
  HiOutlineTruck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const tools: { icon: IconType; label: string; desc: string }[] = [
  {
    icon: HiOutlineViewGrid,
    label: "Business Dashboard",
    desc: "One screen for every route, booking and sale — the daily view your operation runs on.",
  },
  {
    icon: HiOutlineMap,
    label: "Route Setup / Management",
    desc: "Add new routes, adjust stops, and keep schedules current without touching code.",
  },
  {
    icon: HiOutlineTrendingUp,
    label: "Dynamic Pricing Engine",
    desc: "Set fares that flex with demand, season, and seat class — automatically.",
  },
  {
    icon: HiOutlineFire,
    label: "Fuel Management",
    desc: "Track fuel usage and cost per trip to keep every route running efficiently.",
  },
  {
    icon: HiOutlineAdjustments,
    label: "Dynamic Seat Plan Creator",
    desc: "Design custom seat layouts for any coach type in minutes, no developer needed.",
  },
  {
    icon: HiOutlineTruck,
    label: "Fleet Management",
    desc: "Assign vehicles, monitor condition, and keep your entire fleet accounted for.",
  },
];

export default function OperatorFleetTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Smart Tools for{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Modern Bus Operators
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            CWTicketing connects you to a wider audience through a unified
            marketplace, giving you more ways to grow with less effort. Set up
            routes, adjust fares, track bookings in real time, and run your
            daily operations with ease. Get more visibility, fill more seats,
            and grow faster with a system built for modern bus operators.
          </p>
        </div>

        {/* ── Numbered tool cards ── */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
            Operator Dashboard &amp; Fleet Management
          </h3>
        </div>
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

                <span className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
