"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTruck,
  HiOutlineOfficeBuilding,
  HiOutlineGlobe,
  HiOutlineChip,
  HiOutlineMap,
  HiOutlineUsers,
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlineSparkles,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import BusLiveMap from "./BusLiveMap";

interface User {
  icon: IconType;
  title: string;
  desc: string;
}

const users: User[] = [
  {
    icon: HiOutlineTruck,
    title: "Bus operators",
    desc: "Run your own fleet and sell tickets across every channel.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Transport companies",
    desc: "Centralize ticketing for multiple lines and vehicles.",
  },
  {
    icon: HiOutlineGlobe,
    title: "Travel agencies",
    desc: "Retail tickets for many operators from one system.",
  },
  {
    icon: HiOutlineChip,
    title: "Shuttle operators",
    desc: "Manage airport and point-to-point shuttle bookings.",
  },
  {
    icon: HiOutlineMap,
    title: "Intercity bus companies",
    desc: "Handle long-haul routes, seats and schedules.",
  },
  {
    icon: HiOutlineUsers,
    title: "Public transportation companies",
    desc: "Digitize ticketing for city and regional transit.",
  },
  {
    icon: HiOutlineViewGrid,
    title: "Bus ticket marketplaces",
    desc: "Let multiple operators sell on one branded platform.",
  },
  {
    icon: HiOutlineCog,
    title: "Fleet management companies",
    desc: "Combine ticketing with fleet and dispatch operations.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Tourism companies",
    desc: "Bundle coach transfers into your travel packages.",
  },
];

export default function WhoCanUse() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.07 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-can-use-cw-ticketing-system"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Live street map (separated band at the top) ── */}
        <div data-gsap className="relative mx-auto mb-14 w-full max-w-[620px] lg:mb-20">
          <div
            aria-hidden
            className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2.75rem] bg-gradient-to-br from-brand-light via-amber-50/70 to-transparent blur-sm"
          />
          <BusLiveMap />
        </div>

        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Built For Every Bus Business
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Who Can Use CW Ticketing System?
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            From a single coach line to a multi-operator marketplace, the platform
            adapts to how your bus business sells tickets today.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {users.map((u) => {
            const Icon = u.icon;
            return (
              <div
                key={u.title}
                data-gsap
                className="group flex items-start gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-[15px] font-medium tracking-tight text-text-dark">
                    {u.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-text-muted">
                    {u.desc}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
