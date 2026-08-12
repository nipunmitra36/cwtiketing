"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineTruck,
  HiOutlineSwitchHorizontal,
  HiOutlineCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const features: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineMap,
    title: "Multiple routes",
    desc: "Create and manage as many bus routes and boarding points as you operate.",
  },
  {
    icon: HiOutlineCalendar,
    title: "Departure schedules",
    desc: "Set recurring departures per route and adjust times in seconds.",
  },
  {
    icon: HiOutlineTruck,
    title: "Vehicle assignments",
    desc: "Assign buses, drivers and seat plans to every scheduled departure.",
  },
  {
    icon: HiOutlineSwitchHorizontal,
    title: "Synchronized availability",
    desc: "Keep ticket availability in sync across online and offline sales channels.",
  },
];

const departures = [
  { time: "8:30 PM", route: "Dhaka → Sylhet", points: "5 boarding points", bus: "AC Sleeper · GreenLine", status: "On time", tone: "bg-emerald-50 text-emerald-600" },
  { time: "9:00 PM", route: "Dhaka → Chittagong", points: "4 boarding points", bus: "AC Coach · Shohagh", status: "Boarding", tone: "bg-emerald-50 text-emerald-600" },
  { time: "10:30 PM", route: "Dhaka → Cox's Bazar", points: "6 boarding points", bus: "AC Sleeper · Hanif", status: "Departed", tone: "bg-sky-50 text-sky-600" },
  { time: "12:00 AM", route: "Dhaka → Rajshahi", points: "3 boarding points", bus: "Non-AC · TR Travels", status: "Scheduled", tone: "bg-gray-100 text-gray-500" },
];

export default function RouteManagement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="route-and-schedule-management"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: copy ── */}
          <div>
            <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
              Centralized Route Control
            </p>
            <h2
              data-gsap
              className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
            >
              Bus Route &amp; Schedule Management
            </h2>
            <p
              data-gsap
              className="mt-4 max-w-lg text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
            >
              Manage multiple bus routes, departure schedules, boarding points and
              vehicle assignments from a centralized dashboard. Operators can
              update schedules, manage route changes and keep ticket availability
              synchronized across online and offline sales channels.
            </p>

            <div className="mt-9 space-y-5">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} data-gsap className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand shadow-sm transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-text-dark">
                        {f.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-text-muted">
                        {f.desc}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: schedule board ── */}
          <div data-gsap className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-amber-200/30 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
              {/* Window bar */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <p className="text-[12px] font-semibold text-text-dark">Departure Board</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-text-dark">Today&apos;s departures</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-text-muted">
                    <HiOutlineLocationMarker className="h-3.5 w-3.5 text-brand" />
                    8 routes active
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {departures.map((d) => (
                    <div
                      key={d.route}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 transition-colors hover:border-brand/25"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="w-14 shrink-0 text-[12px] font-semibold text-text-dark">
                          {d.time}
                        </span>
                        <span className="h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-brand to-brand/30" />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-text-dark">{d.route}</p>
                          <p className="truncate text-[11px] text-text-muted">
                            {d.points} · {d.bus}
                          </p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${d.tone}`}>
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-brand/30 bg-brand-light/50 px-4 py-3">
                  <p className="text-[12.5px] font-medium leading-snug text-text-body">
                    Same seat map, every channel — counter, agents, app and web.
                  </p>
                  <HiOutlineArrowRight className="h-4 w-4 shrink-0 text-brand" />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-3.5 py-2.5 shadow-xl shadow-gray-900/10 backdrop-blur-xl sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-light text-brand">
                <HiOutlineCheck className="h-4 w-4" />
              </span>
              <span className="text-[11.5px] font-semibold leading-tight text-text-dark">
                Availability synced
                <span className="block text-[10px] font-medium text-text-muted">across all channels</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
