"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineX,
  HiOutlineCheck,
  HiOutlinePhone,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineTicket,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineChartBar,
  HiOutlineArrowRight,
} from "react-icons/hi";

const problems = [
  { icon: HiOutlinePhone, label: "Manual booking calls", desc: "Phone, WhatsApp, and paper logs eat hours every day." },
  { icon: HiOutlineDocumentText, label: "Spreadsheet schedules", desc: "Outdated timetables that nobody trusts." },
  { icon: HiOutlineClock, label: "No real-time availability", desc: "Sold-out confusion and double bookings." },
  { icon: HiOutlineCurrencyDollar, label: "Payment tracking problems", desc: "Missed revenue and cash reconciliation headaches." },
];

const solutions = [
  { icon: HiOutlineTicket, label: "Automated booking", desc: "Online bookings 24/7 with instant confirmation." },
  { icon: HiOutlineViewGrid, label: "Live seat availability", desc: "Real-time seat maps that always match reality." },
  { icon: HiOutlineCreditCard, label: "Online payments", desc: "Multiple secure gateways accepted automatically." },
  { icon: HiOutlineChartBar, label: "Business analytics", desc: "See sales and revenue at a glance, daily." },
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-cw-ticketing"
      className="relative overflow-hidden bg-gradient-to-b from-white to-surface py-16 lg:py-24"
    >
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-100/50 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            data-gsap
            className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Why Operators Move to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">CW Ticketing</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
            </span>
          </h2>
          <p
            data-gsap
            className="mt-3 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            The way most transport operators sell tickets is broken. Here is
            what changes with CW Ticketing.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ── Before (Problem) ── */}
          <div
            data-gsap
            className="group relative overflow-hidden rounded-3xl border border-rose-200 bg-white p-6 shadow-xl shadow-rose-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/15 sm:p-8"
          >
            {/* top accent */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-400 via-rose-500 to-red-500" />
            {/* glows */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-rose-100/60 blur-3xl" />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/30">
                <HiOutlineX className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                  Before
                </p>
                <h3 className="text-lg font-semibold text-text-dark">Old-School Ticketing</h3>
              </div>
              <span className="ml-auto rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-500 ring-1 ring-rose-100">
                The Problem
              </span>
            </div>

            <ul className="relative space-y-3">
              {problems.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3.5 transition-colors duration-200 hover:border-rose-200 hover:bg-rose-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm ring-1 ring-rose-100 transition-colors duration-200 group-hover:bg-rose-500 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-text-dark">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-text-muted">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="relative mt-5 flex items-center gap-2 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 px-4 py-3">
              <HiOutlineClock className="h-4 w-4 shrink-0 text-rose-400" />
              <p className="text-[12.5px] font-medium text-rose-500">
                Every day, operators quietly pay for this inefficiency.
              </p>
            </div>
          </div>

          {/* ── Divider arrow (desktop) ── */}
          <div
            data-gsap
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-brand shadow-xl shadow-gray-900/10">
              <HiOutlineArrowRight className="h-5 w-5" />
            </span>
          </div>

          {/* ── After (Solution) ── */}
          <div
            data-gsap
            className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-white p-6 shadow-xl shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/15 sm:p-8"
          >
            {/* top accent */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500" />
            {/* glows */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30">
                <HiOutlineCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                  After
                </p>
                <h3 className="text-lg font-semibold text-text-dark">CW Ticketing</h3>
              </div>
              <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-100">
                The Solution
              </span>
            </div>

            <ul className="relative space-y-3">
              {solutions.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3.5 transition-colors duration-200 hover:border-emerald-200 hover:bg-emerald-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100 transition-colors duration-200 group-hover:bg-emerald-500 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-text-dark">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-text-muted">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/features"
              className="group/cta relative mt-5 flex items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 transition-colors duration-200 hover:border-emerald-300 hover:bg-emerald-50"
            >
              <p className="text-[12.5px] font-semibold text-emerald-700">
                See it live — explore the full product
              </p>
              <HiOutlineArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
