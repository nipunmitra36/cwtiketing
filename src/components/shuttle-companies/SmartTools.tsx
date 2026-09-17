"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineArrowRight,
} from "react-icons/hi";

const MEDIA = "/media/suttle/(Feature heading for Local Operators";

const tools: { image: string; label: string; desc: string }[] = [
  {
    image: `${MEDIA}/Short Route Scheduling.svg`,
    label: "Short Route Scheduling",
    desc: "Plan frequent departures and keep local routes running like clockwork.",
  },
  {
    image: `${MEDIA}/Stop-to-Stop Fare Management.svg`,
    label: "Stop-to-Stop Fare Management",
    desc: "Price every hop with zone-based and stop-to-stop fare rules.",
  },
  {
    image: `${MEDIA}/Real-Time Passenger Load Monitoring.svg`,
    label: "Real-Time Passenger Load Monitoring",
    desc: "See exact passenger load in real time and balance your fleet accordingly.",
  },
  {
    image: `${MEDIA}/Driver Shift Management.svg`,
    label: "Driver Shift Management",
    desc: "Assign drivers and shifts, and keep every local route fully covered.",
  },
  {
    image: `${MEDIA}/Smart Reporting Tools.svg`,
    label: "Smart Reporting Tools",
    desc: "Track sales, loads, and route performance with clear insight.",
  },
  {
    image: `${MEDIA}/Route Conflict Alerts.svg`,
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
        {/* ── Split header with section image (image left) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/suttle/Smart-Tools-for-Local-Bus-Operators.jpg"
              alt="Smart tools for local bus operators"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
          <div data-gsap className="order-2">
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
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              Take full control of your short-distance routes with a flexible
              ticketing system. Manage schedules, fare zones, and shifts
              effortlessly while boosting passenger convenience and growing your
              ticket sales.
            </p>
          </div>
        </div>

        {/* ── Numbered tool cards ── */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <div
                key={t.label}
                data-gsap
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-brand-light/40 p-7 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
              >
                {/* top accent bar */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-500 group-hover:scale-x-100" />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-light to-white p-2 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.label}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand/15 bg-brand-light/50 text-[10px] font-bold tracking-widest text-brand">
                    {idx}
                  </span>
                </div>

                <h3 className="relative mt-5 pr-10 text-[16px] font-semibold tracking-tight text-text-dark">
                  {t.label}
                </h3>
                <p className="relative mt-2 flex-1 text-[13.5px] leading-relaxed text-text-muted">{t.desc}</p>

                <span className="relative mt-6 inline-flex h-9 w-9 items-center justify-center self-start rounded-full border border-gray-200 text-text-muted transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}